import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionariesService } from './questionaries.service';
import { CreateQuestionaryDto } from './dto/create-questionary.dto';
import { UpdateQuestionaryDto } from './dto/update-questionary.dto';

@Controller('questionaries')
export class QuestionariesController {
  constructor(private readonly questionariesService: QuestionariesService) {}

  @Post()
  create(@Body() createQuestionaryDto: CreateQuestionaryDto) {
    return this.questionariesService.create(createQuestionaryDto);
  }

  @Get()
  findAll() {
    return this.questionariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionariesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionaryDto: UpdateQuestionaryDto) {
    return this.questionariesService.update(+id, updateQuestionaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionariesService.remove(+id);
  }

  //questionary Versions
  @Delete(':questionaryId/version/:versionId')
  deleteVersion(
    @Param('questionaryId') questionaryId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.questionariesService.deleteVersion(questionaryId, versionId);
  }
}
