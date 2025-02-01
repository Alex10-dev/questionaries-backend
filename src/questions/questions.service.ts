import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionariesService } from 'src/questionaries/questionaries.service';

@Injectable()
export class QuestionsService {
  
  constructor(
    private prismaService: PrismaService,
    private questionaryService: QuestionariesService
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

  async createQuestionForVersion(versionId: string, createQuestionDto: CreateQuestionDto) {
    try{
      await this.questionaryService.findVersionById(versionId);

      const transaction = await this.prismaService.$transaction(
        async (prisma) => {
          const newQuestion: Question = await this.createQuestion(createQuestionDto);
          await this.prismaService.questionaryVersionToQuestion.create({
            data: {
              versionId,
              questionId: newQuestion.id,
            }
          });

          return newQuestion
        }
      );

      return transaction;

    } catch( error ) {
      if( error instanceof HttpException ) throw error;
      throw new InternalServerErrorException(`${error}`);
    }
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
