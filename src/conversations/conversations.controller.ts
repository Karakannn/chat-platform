import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { createConversationDto } from './dtos/create-conversation.dto';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() payload: createConversationDto,
  ) {
    return this.conversationsService.createConversation(user, payload);
  }
}
