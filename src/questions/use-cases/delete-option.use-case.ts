import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { GetOneOptionFromQuestionUseCase } from "./get-one-option-from-question.use-case";

@Injectable()
export class DeleteOptionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly getOneOptionFromQuestionUseCase: GetOneOptionFromQuestionUseCase,
    ){}

    async execute(optionId: string, questionId: string) {
        try {
            await this.getOneOptionFromQuestionUseCase.execute(optionId, questionId);
            return this.questionsService.deleteOption(optionId, questionId);

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}