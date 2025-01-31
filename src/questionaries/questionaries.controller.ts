import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionariesService } from './questionaries.service';
import { CreateQuestionaryDto } from './dto/create-questionary.dto';
import { UpdateQuestionaryDto } from './dto/update-questionary.dto';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

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
    return this.questionariesService.findOne(id);
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
  @Get(':questionaryId/version/:versionId')
  findOneVersion(
    @Param('questionaryId') questionaryId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.questionariesService.findOneVersion(questionaryId, versionId);
  }

  @Get(':questionaryId/versions')
  findAllVersions(
    @Param('questionaryId') questionaryId: string,
  ) {
    return this.questionariesService.findAllVersions(questionaryId);
  }

  @Post(':questionaryId/version')
  createVersion(
    @Body() createVersionDto: CreateVersionDto,
    @Param('questionaryId') questionaryId: string,
  ) {
    return this.questionariesService.createVersion(questionaryId, createVersionDto);
  }

  @Patch(':questionaryId/version/:versionId')
  updateVersion(
    @Param('questionaryId') questionaryId: string,
    @Param('versionId') versionId: string,
    @Body() updateVersionDto: UpdateVersionDto,
  ) {
    return this.questionariesService.updateVersion(questionaryId, versionId, updateVersionDto);
  }

  @Delete(':questionaryId/version/:versionId')
  deleteVersion(
    @Param('questionaryId') questionaryId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.questionariesService.deleteVersion(questionaryId, versionId);
  }

  @Delete(':questionaryId/versions')
  deleteAllQuestionaryVersions(@Param('questionaryId') questionaryId: string) {
    return this.questionariesService.deleteAllQuestionaryVersions(questionaryId);
  }
}
