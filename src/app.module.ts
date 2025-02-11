import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, Envs, ValidationSchema } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionariesModule } from './questionaries/questionaries.module';
import { QuestionsModule } from './questions/questions.module';

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
  ],
  providers: [EnvConfig],
  exports: [EnvConfig],
})
export class AppModule {}
