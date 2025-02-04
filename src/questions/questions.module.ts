import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionariesModule } from 'src/questionaries/questionaries.module';
import { CreateQuestionForVersionUseCase } from './use-cases/create-question-for-version.use-case';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService, 
    
    //use cases
    CreateQuestionForVersionUseCase
  ],
  imports: [PrismaModule, QuestionariesModule],
})
export class QuestionsModule {}
