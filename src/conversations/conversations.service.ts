import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './conversations';
import { CreateConversationParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Participant, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IParticipantsService } from 'src/participants/participant';
import { IUserService } from 'src/users/user';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantService: IParticipantsService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async createConversation(user: User, params: CreateConversationParams) {
    const userDb = await this.userService.findUser({ id: user.id });

    const recipient = await this.userService.findUser({
      id: params.recipientId,
    });

    const participants: Participant[] = [];

    if (!recipient)
      throw new HttpException('User not found', HttpStatus.CONFLICT);

    if (!userDb.participant) {
      const participant = await this.createParticipantAndSaveUser(
        userDb,
        params.authorId,
      );

      participants.push(participant);
    } else {
      participants.push(userDb.participant);
    }

    if (!recipient.participant) {
      const participant = await this.createParticipantAndSaveUser(
        recipient,
        params.recipientId,
      );
      participants.push(participant);
    } else {
      participants.push(recipient.participant);
    }

    const conversation = this.conversationRepository.create({ participants });
    return this.conversationRepository.save(conversation);
  }

  private async createParticipantAndSaveUser(user: User, id: number) {
    const newParticipant = await this.participantService.createParticipant({
      id,
    });

    console.log('newParticipant', newParticipant);

    user.participant = newParticipant;

    await this.userService.saveUser(user);

    return newParticipant;
  }
}
