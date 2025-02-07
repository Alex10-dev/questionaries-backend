import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionariesModule } from 'src/questionaries/questionaries.module';
import { CreateQuestionForVersionUseCase } from './use-cases/create-question-for-version.use-case';
import { GetQuestionByID } from './use-cases/get-question-by-id';
import { GetAllQuestionsForVersionUseCase } from './use-cases/get-all-questions-for-version.use-case';
import { UpdateQuestionUseCase } from './use-cases/update-question.use-case';
import { AddQuestionToVersionUseCase } from './use-cases/add-question-to-version.use-case';
import { RemoveQuestionFromVersionUseCase } from './use-cases/remove-question-from-version.use-case';
import { DeleteQuestionUseCase } from './use-cases/delete-question.use-case';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService, 
    
    //use cases
    CreateQuestionForVersionUseCase,
    GetQuestionByID,
    GetAllQuestionsForVersionUseCase,
    UpdateQuestionUseCase,
    AddQuestionToVersionUseCase,
    RemoveQuestionFromVersionUseCase,
    DeleteQuestionUseCase,
  ],
  imports: [PrismaModule, QuestionariesModule],
})
export class QuestionsModule {}
