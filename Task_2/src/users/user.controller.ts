import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('reset-issues')
  async resetIssues() {
    const count = await this.userService.resetIssuesAndCount();
    return { message: 'Issues reset successfully', count };
  }
}
