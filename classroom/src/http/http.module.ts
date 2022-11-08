import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';
import { DatabaseModule } from '../database/database.module';
import { CoursesResolver } from './graphql/resolvers/course.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollment.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    CoursesResolver,
    StudentsResolver,
    EnrollmentsResolver,

    // Services
    CoursesService,
    StudentsService,
    EnrollmentsService,
  ],
})
export class HttpModule {}
