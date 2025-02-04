import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { QuestionsService } from "../questions.service";
import { QuestionariesService } from "src/questionaries/questionaries.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CreateQuestionForVersionUseCase {

    constructor(
        private prismaService: PrismaService,
        private readonly questionsService: QuestionsService,
        private readonly questionaryService: QuestionariesService
    ){}

    async execute(versionId: string, createQuestionDto: CreateQuestionDto) {
        try{
            const version = await this.questionaryService.findVersionById(versionId);
            if( !version ) throw new NotFoundException(`Questionary Version with id: ${versionId} doesn't exist`);

            const transaction = await this.prismaService.$transaction(
                async (prisma) => {
                    const newQuestion = await this.questionsService.createQuestion(createQuestionDto);
                    await this.questionsService.linkQuestionToVersion(newQuestion.id, versionId);
        
                    return newQuestion
                }
            );

            return transaction;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}