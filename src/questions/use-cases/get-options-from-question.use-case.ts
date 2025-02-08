import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { GetQuestionByID } from "./get-question-by-id";

@Injectable()
export class GetOptionsFromQuestionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly getQuestionByIdUseCase: GetQuestionByID,
    ){}

    async execute(questionId: string) {
        try {
            await this.getQuestionByIdUseCase.execute(questionId);
            return this.questionsService.getOptionsFromQuestion(questionId);

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}