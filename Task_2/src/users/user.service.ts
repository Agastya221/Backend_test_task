import { Injectable } from '@nestjs/common';
import {PrismaService}  from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async resetIssuesAndCount(): Promise<number> {

    const count = await this.prisma.user.count({ where: { issues: true } });

    await this.prisma.user.updateMany({
      where: { issues: true },
      data: { issues: false },
    });

    return count;
  }
}
