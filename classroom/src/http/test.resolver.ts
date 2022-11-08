import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from './auth/authorization.guard';

type Customer = {
  id: string;
};

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  async hello() {
    // const customers = this.prisma.customer.findMany();
    // return customers;
    return 'ok classroom';
  }
}
