import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}
  async listAllStudents() {
    return await this.prismaService.student.findMany();
  }

  async getStudentByAuthUserId(authUserId: string) {
    return await this.prismaService.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async getStudentById(authUserId: string) {
    return await this.prismaService.student.findUnique({
      where: {
        authUserId,
      },
    });
  }
}
