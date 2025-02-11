import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionForVersionUseCase } from './use-cases/create-question-for-version.use-case';
import { GetQuestionByID } from './use-cases/get-question-by-id';
import { GetAllQuestionsForVersionUseCase } from './use-cases/get-all-questions-for-version.use-case';
import { UpdateQuestionUseCase } from './use-cases/update-question.use-case';
import { AddQuestionToVersionUseCase } from './use-cases/add-question-to-version.use-case';
import { RemoveQuestionFromVersionUseCase } from './use-cases/remove-question-from-version.use-case';
import { DeleteQuestionUseCase } from './use-cases/delete-question.use-case';
import { CreateOptionDto } from './dto/create-option.dto';
import { CreateOptionForQuestionUseCase } from './use-cases/create-option-for-question.use-case';
import { GetOptionsFromQuestionUseCase } from './use-cases/get-options-from-question.use-case';
import { GetOneOptionFromQuestionUseCase } from './use-cases/get-one-option-from-question.use-case';
import { UpdateOptionDto } from './dto/update-option.dto';
import { UpdateOptionUseCase } from './use-cases/update-option.use-case';
import { DeleteOptionUseCase } from './use-cases/delete-option.use-case';

@Controller('questions')
export class QuestionsController {

  constructor(
    private readonly questionsService: QuestionsService,

    //use cases
    private readonly createQuestionForVersionUseCase: CreateQuestionForVersionUseCase,
    private readonly getQuestionByID: GetQuestionByID,
    private readonly getAllQuestionsForVersion: GetAllQuestionsForVersionUseCase,
    private readonly updateQuestionUseCase: UpdateQuestionUseCase,
    private readonly addQuestionToVersion: AddQuestionToVersionUseCase,
    private readonly removeQuestionFromVersionUseCase: RemoveQuestionFromVersionUseCase,
    private readonly deleteQuestionUseCase: DeleteQuestionUseCase,
    private readonly createOptionForQuestionUseCase: CreateOptionForQuestionUseCase,
    private readonly getOptionsFromQuestionUseCase: GetOptionsFromQuestionUseCase,
    private readonly getOneOptionFromQuestionUseCase: GetOneOptionFromQuestionUseCase,
    private readonly updateOptionUseCase: UpdateOptionUseCase,
    private readonly deleteOptionUseCase: DeleteOptionUseCase,
  ) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Post('/questionary-version/:versionId')
  createQuestionForVersion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param('versionId') versionId: string,
  ) {
    return this.createQuestionForVersionUseCase.execute(versionId, createQuestionDto);
  }

  @Post(':questionId/questionary-version/:versionId')
  addQuestionToQuestionaryVersion(
    @Param('questionId') questionId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.addQuestionToVersion.execute(questionId, versionId);
  }

  @Post(':questionId/options')
  createOption(
    @Body() createOptionDto: CreateOptionDto,
    @Param('questionId') questionId: string,
  ) {
    return this.createOptionForQuestionUseCase.execute(questionId, createOptionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get('/questionary-version/:versionId')
  findAllQuestionsForVersion(@Param('versionId') versionId: string) {
    return this.getAllQuestionsForVersion.execute( versionId );
  }

  @Get(':questionId')
  findOne(@Param('questionId') questionId: string) {
    return this.getQuestionByID.execute( questionId );
  }

  @Get(':questionId/options')
  findOptionsFromQuestion(
    @Param('questionId') questionId: string,
  ) {
    return this.getOptionsFromQuestionUseCase.execute(questionId);
  }

  @Get(':questionId/options/:optionId')
  findOneOptionFromQuestion(
    @Param('questionId') questionId: string,
    @Param('optionId') optionId: string,
  ) {
    return this.getOneOptionFromQuestionUseCase.execute(optionId, questionId);
  }

  @Patch(':questionId')
  update(
    @Param('questionId') questionId: string, 
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.updateQuestionUseCase.execute( questionId, updateQuestionDto );
  }

  @Patch(':questionId/options/:optionId')
  updateOption(
    @Param('questionId') questionId: string,
    @Param('optionId') optionId: string,  
    @Body() updateOptionDto: UpdateOptionDto
  ) {
    return this.updateOptionUseCase.execute(optionId, questionId, updateOptionDto);
  }

  @Delete(':questionId')
  remove(@Param('questionId') questionId: string) {
    return this.deleteQuestionUseCase.execute( questionId );
  }

  @Delete(':questionId/questionary-version/:versionId')
  removeQuestionFromVersion(
    @Param('questionId') questionId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.removeQuestionFromVersionUseCase.execute(questionId, versionId);
  }

  @Delete(':questionId/options/:optionId')
  deleteOption(
    @Param('questionId') questionId: string,
    @Param('optionId') optionId: string,
  ) {
    return this.deleteOptionUseCase.execute(optionId, questionId);
  }
}
