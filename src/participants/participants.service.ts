import { Injectable } from '@nestjs/common';
import { IParticipantsService } from './participant';
import { Participant } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  createParticipantParams,
  FindParticipantParams,
} from 'src/utils/types';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}
  async findParticipant(
    params: FindParticipantParams,
  ): Promise<Participant> | null {

    console.log("params", params);
    
    return this.participantRepository.findOne({
      where: params,
    });
  }
  async createParticipant(
    params: createParticipantParams,
  ): Promise<Participant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }
}
