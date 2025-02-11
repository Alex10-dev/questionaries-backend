import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { GetQuestionByID } from "./get-question-by-id";
import { PrismaService } from "src/prisma/prisma.service";
import { QuestionType } from "src/common/question-type.enum";

@Injectable()
export class DeleteQuestionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly getQuestionByIdUseCase: GetQuestionByID,
        private prismaService: PrismaService,
    ){}

    async execute(questionId: string) {
        try {
            const question = await this.getQuestionByIdUseCase.execute(questionId);

            const transaction = await this.prismaService.$transaction(
                async (prisma) => {
                    const deletedRelations = await this.questionsService.removeQuestionFromAllVersions(questionId);
                    
                    let deletedOptions = 0;
                    if( question.type != QuestionType.TEXT ) {
                        deletedOptions = (await this.questionsService.deleteOptionsFromQuestion( question.id )).count;
                    }
                    const deletedQuestion = await this.questionsService.remove(question.id);
                    return {
                        question: deletedQuestion,
                        removedFromVersions: deletedRelations.count,
                        deletedOptions: deletedOptions,
                    };
                }
            )

            return transaction;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}