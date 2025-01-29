import { Module } from '@nestjs/common';
import { QuestionariesService } from './questionaries.service';
import { QuestionariesController } from './questionaries.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [QuestionariesController],
  providers: [QuestionariesService],
  imports: [PrismaModule],
})
export class QuestionariesModule {}
