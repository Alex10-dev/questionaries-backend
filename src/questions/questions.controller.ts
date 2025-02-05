import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionForVersionUseCase } from './use-cases/create-question-for-version.use-case';
import { GetQuestionByID } from './use-cases/get-question-by-id';
import { GetAllQuestionsForVersionUseCase } from './use-cases/get-all-questions-for-version.use-case';

@Controller('questions')
export class QuestionsController {

  constructor(
    private readonly questionsService: QuestionsService,

    //use cases
    private readonly createQuestionForVersionUseCase: CreateQuestionForVersionUseCase,
    private readonly getQuestionByID: GetQuestionByID,
    private readonly getAllQuestionsForVersion: GetAllQuestionsForVersionUseCase,
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
