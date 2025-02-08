import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { GetOneOptionFromQuestionUseCase } from "./get-one-option-from-question.use-case";
import { UpdateOptionDto } from "../dto/update-option.dto";

@Injectable()
export class UpdateOptionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly getOneOptionFromQuestionUseCase: GetOneOptionFromQuestionUseCase,
    ){}

    async execute(
        optionId: string, 
        questionId: string, 
        updateOptionDto: UpdateOptionDto
    ) {
        try {
            await this.getOneOptionFromQuestionUseCase.execute(optionId, questionId);
            return await this.questionsService.updateOption(optionId, questionId, updateOptionDto);

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}