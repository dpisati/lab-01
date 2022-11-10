import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  authUserId: string;
  product: Product;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.authUserId,
    );

    if (!student) {
      await this.studentsService.createStudent({
        authUserId: payload.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      await this.coursesService.createCourse({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
