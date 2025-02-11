import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";

@Injectable()
export class GetQuestionByID {

    constructor(
        private readonly questionsService: QuestionsService,
    ){}

    async execute( questionId: string ) {
        try {
            const question = await this.questionsService.findOne( questionId );

            if( !question ) throw new NotFoundException(`Question with id: ${ questionId } doesn't exist`);
            return question;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}