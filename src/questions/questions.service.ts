import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '@prisma/client';
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

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
