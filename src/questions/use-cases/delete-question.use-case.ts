import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { GetQuestionByID } from "./get-question-by-id";
import { PrismaService } from "src/prisma/prisma.service";

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
                    const deletedQuestion = await this.questionsService.remove(question.id);

                    return {
                        question: deletedQuestion,
                        removedFromVersions: deletedRelations.count,
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