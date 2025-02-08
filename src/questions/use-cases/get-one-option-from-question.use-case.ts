import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { GetQuestionByID } from "./get-question-by-id";

@Injectable()
export class GetOneOptionFromQuestionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly getQuestionByIdUseCase: GetQuestionByID,
    ){}

    async execute(optionId: string, questionId: string) {
        try {
            await this.getQuestionByIdUseCase.execute(questionId);
            const option = await this.questionsService.findOneOption(optionId);

            if( !option ) throw new NotFoundException(`Option with id: ${optionId} doesn't exist`);
            if( option.questionId != questionId ) 
                throw new BadRequestException(`The option isn't related to the question with id: ${questionId}`);
            
            return option;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}