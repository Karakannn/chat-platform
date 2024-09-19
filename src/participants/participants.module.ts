import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantsController],
  providers: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantsService,
    },
  ],
  exports: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantsService,
    },
  ],
})
export class ParticipantsModule {}
