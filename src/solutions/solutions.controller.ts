import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { CreateNewSolutionUseCase } from './use-cases/create-new-solution.use-case';
import { findAllSolutionsUseCase } from './use-cases/find-all-solutions.use-case';
import { findAllSolutionsForVersionUseCase } from './use-cases/find-all-solutions-for-version.use-case';

@Controller('solutions')
export class SolutionsController {
  constructor(
    private readonly solutionsService: SolutionsService,
    private readonly createSolutionUseCase: CreateNewSolutionUseCase,
    private readonly findAllSolutionsUseCase: findAllSolutionsUseCase,
    private readonly findSolutionsForVersionUseCase: findAllSolutionsForVersionUseCase,
  ) {}

  @Post('/questionary-version/:versionId')
  create(
    @Param('versionId') versionId: string,
    @Body() createSolutionDto: CreateSolutionDto
  ) {
    return this.createSolutionUseCase.execute(versionId, createSolutionDto);
  }

  @Get()
  findAll() {
    return this.findAllSolutionsUseCase.execute();
  }

  @Get('/questionary-version/:versionId')
  findAllSolutionFroVersion(
    @Param('versionId') versionid: string,
  ) {
    return this.findSolutionsForVersionUseCase.execute(versionid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionDto: UpdateSolutionDto) {
    return this.solutionsService.update(+id, updateSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(+id);
  }
}
