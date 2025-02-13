import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, Envs, ValidationSchema } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionariesModule } from './questionaries/questionaries.module';
import { QuestionsModule } from './questions/questions.module';
import { SolutionsModule } from './solutions/solutions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Envs],
      validationSchema: ValidationSchema,
      isGlobal: true,
    }),
    PrismaModule,
    QuestionariesModule,
    QuestionsModule,
    SolutionsModule,
  ],
  providers: [EnvConfig],
  exports: [EnvConfig],
})
export class AppModule {}
