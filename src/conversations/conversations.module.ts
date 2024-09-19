import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/utils/typeorm';
import { ParticipantsService } from 'src/participants/participants.service';
import { UsersModule } from 'src/users/users.module';
import { ParticipantsModule } from 'src/participants/participants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UsersModule,
    ParticipantsModule,
  ],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule {}
