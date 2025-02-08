import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Option, Question } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  
  constructor(
    private prismaService: PrismaService,
  ){}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    try{
      const createdQuestion: Question = await this.prismaService.question.create({
        data: {
          question: createQuestionDto.question,
          isActive: createQuestionDto.isActive,
          type: createQuestionDto.type,
          correctAnswer: createQuestionDto.correctAnswer,
        }
      });

      return createdQuestion;

    } catch( error ) {
      if( error instanceof HttpException ) throw error;
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async linkQuestionToVersion(questionId: string, versionId: string) {
    return await this.prismaService.questionaryVersionToQuestion.create({
      data: { versionId, questionId, }
    });
  }

  async findAll() {
    return await this.prismaService.question.findMany();
  }

  async findAllQuestionsForVersion(versionId: string) {
    return await this.prismaService.questionaryVersionToQuestion.findMany({
      where: { versionId },
      include: { question: true, }
    });
  }

  async findQuestionInVersion(questionId: string, versionId: string) {
    return await this.prismaService.questionaryVersionToQuestion.findUnique({
      where: { versionId_questionId: {
        questionId, versionId,
      }}
    });
  }

  async findOne(id: string) {
    return await this.prismaService.question.findUnique({
      where: { id }
    });
  }

  async update(id: string, data: Partial<Question>): Promise<Question> {
    return await this.prismaService.question.update({
      data,
      where: { id }
    });
  }

  async remove(id: string) {
    return await this.prismaService.question.delete({
      where: { id }
    });
  }

  async removeQuestionFromVersion(questionId: string, versionId: string) {
    return await this.prismaService.questionaryVersionToQuestion.delete({
      where: { versionId_questionId : {
        questionId, versionId
      }}
    });
  }

  async removeQuestionFromAllVersions(questionId: string) {
    return await this.prismaService.questionaryVersionToQuestion.deleteMany({
      where: { questionId }
    });
  }

  //options
  async createOptionForQuestion(questionId: string, data: Partial<Option>) {
    return await this.prismaService.option.create({
      data: {
        text: data.text!,
        isCorrect: data.isCorrect,
        questionId: questionId,
      }
    });
  }

  async getOptionsFromQuestion(questionId: string) {
    return await this.prismaService.option.findMany({
      where: { questionId }
    });
  }

  async findOneOption(optionId: string) {
    return await this.prismaService.option.findUnique({
      where: {id: optionId}
    });
  }

  async updateOption(optionId: string, questionId: string, data: Partial<Option>) {
    return await this.prismaService.option.update({
      where: { id: optionId, questionId },
      data
    });
  }

  async deleteOption(optionId: string, questionId: string) {
    return await this.prismaService.option.delete({
      where: { id: optionId, questionId }
    });
  }

}
