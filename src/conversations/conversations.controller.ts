import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { createConversationDto } from './dtos/create-conversation.dto';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Post()
  createConversation(@Body() payload: createConversationDto) {
    this.conversationsService.createConversation(payload);
  }
}
