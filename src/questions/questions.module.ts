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
import { CreateOptionForQuestionUseCase } from './use-cases/create-option-for-question.use-case';
import { GetOptionsFromQuestionUseCase } from './use-cases/get-options-from-question.use-case';
import { GetOneOptionFromQuestionUseCase } from './use-cases/get-one-option-from-question.use-case';
import { UpdateOptionUseCase } from './use-cases/update-option.use-case';
import { DeleteOptionUseCase } from './use-cases/delete-option.use-case';

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
    CreateOptionForQuestionUseCase,
    GetOptionsFromQuestionUseCase,
    GetOneOptionFromQuestionUseCase,
    UpdateOptionUseCase,
    DeleteOptionUseCase,
  ],
  imports: [PrismaModule, QuestionariesModule],
  exports: [QuestionsService, GetAllQuestionsForVersionUseCase],
})
export class QuestionsModule {}
