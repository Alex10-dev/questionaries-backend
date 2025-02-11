import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { UpdateQuestionDto } from "../dto/update-question.dto";
import { GetQuestionByID } from "./get-question-by-id";
import { Question } from "@prisma/client";
import { QuestionType } from "src/common/question-type.enum";

@Injectable()
export class UpdateQuestionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly getQuestionById: GetQuestionByID,
    ){}

    public async execute(questionId: string, updateQuestionDto: UpdateQuestionDto) {
        try{
            await this.getQuestionById.execute(questionId);
            const dataToUpdate: Partial<Question> = {
                question: updateQuestionDto.question,
                isActive: updateQuestionDto.isActive,
                correctAnswer: updateQuestionDto.correctAnswer,
                type: updateQuestionDto.type,
            };

            if( updateQuestionDto.type !== null && updateQuestionDto.type !== QuestionType.TEXT ) {
                dataToUpdate.correctAnswer = null;
            }

            return await this.questionsService.update(questionId, dataToUpdate);

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}