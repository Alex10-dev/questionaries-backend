import { Injectable } from '@nestjs/common';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer, Solution } from '@prisma/client';

@Injectable()
export class SolutionsService {

  constructor(
    private readonly prismaService: PrismaService
  ){}

  async createSolution(versionId: string, data: Partial<Solution>) {
    return await this.prismaService.solution.create({
      data: {
        questionaryVersionId: versionId,
        endedAt: data.endedAt,
        ended: data.ended,
      }
    });
  }

  async findAllSolutions() {
    return await this.prismaService.solution.findMany({
      include: {questionaryVersion: true}
    });
  }

  async findAllSolutionsForVersion(versionId: string) {
    return await this.prismaService.solution.findMany({
      where: { questionaryVersionId: versionId },
      include: { answers: true },
    });
  }

  async findOneSolution(solutionId: string) {
    return await this.prismaService.solution.findUnique({
      where: { id: solutionId }
    });
  }

  update(id: number, updateSolutionDto: UpdateSolutionDto) {
    return `This action updates a #${id} solution`;
  }

  remove(id: number) {
    return `This action removes a #${id} solution`;
  }

  //answers
  async createOneAnswer(solutionId: string, questionId: string, data: Partial<Answer>) {
    return await this.prismaService.answer.create({
      data: {
        textAnswer: data.textAnswer,
        solutionId,
        questionId
      }
    });
  }

  async findAllAnswersForSolution(solutionId: string) {
    return await this.prismaService.answer.findMany({
      where: { solutionId },
      include: { question: true },
    });
  }

  async createAnswersForNewSolution( data: any ) {
    return await this.prismaService.answer.createManyAndReturn({
      data,
      include: { question: true },
    });
  }
}
