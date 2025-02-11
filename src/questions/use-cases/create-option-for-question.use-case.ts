import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { GetQuestionByID } from "./get-question-by-id";
import { CreateOptionDto } from "../dto/create-option.dto";
import { Option } from "@prisma/client";

@Injectable()
export class CreateOptionForQuestionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly getQuestionByIdUseCase: GetQuestionByID,
    ){}

    async execute(questionId: string, createOptionDto: CreateOptionDto) {
        try {
            const question = await this.getQuestionByIdUseCase.execute(questionId);

            const data: Partial<Option> = {
                text: createOptionDto.text,
                isCorrect: createOptionDto.isCorrect,
                questionId: question.id,
            };

            return await this.questionsService.createOptionForQuestion(questionId, data);

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}