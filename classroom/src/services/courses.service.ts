import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prismaService: PrismaService) {}

  listAllCourses() {
    return this.prismaService.course.findMany();
  }

  getCourseById(id: string) {
    return this.prismaService.course.findUnique({
      where: {
        id,
      },
    });
  }

  getCourseBySlug(slug: string) {
    return this.prismaService.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const titleAlreadyExist = await this.prismaService.course.findUnique({
      where: {
        slug,
      },
    });

    if (titleAlreadyExist) {
      throw new Error('Course already registered.');
    }

    return this.prismaService.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
