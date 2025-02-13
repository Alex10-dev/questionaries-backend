import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuestionariesModule } from 'src/questionaries/questionaries.module';
import { CreateNewSolutionUseCase } from './use-cases/create-new-solution.use-case';
import { findAllSolutionsUseCase } from './use-cases/find-all-solutions.use-case';
import { findAllSolutionsForVersionUseCase } from './use-cases/find-all-solutions-for-version.use-case';

@Module({
  controllers: [SolutionsController],
  providers: [
    SolutionsService,

    //use cases
    CreateNewSolutionUseCase,
    findAllSolutionsUseCase,
    findAllSolutionsForVersionUseCase,
  ],
  imports: [PrismaModule, QuestionsModule, QuestionariesModule],
  exports: [SolutionsService],
})
export class SolutionsModule {}
