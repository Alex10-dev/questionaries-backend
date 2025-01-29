import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, Envs, ValidationSchema } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionariesModule } from './questionaries/questionaries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Envs],
      validationSchema: ValidationSchema,
      isGlobal: true,
    }),
    PrismaModule,
    QuestionariesModule,
  ],
  providers: [EnvConfig],
  exports: [EnvConfig],
})
export class AppModule {}
