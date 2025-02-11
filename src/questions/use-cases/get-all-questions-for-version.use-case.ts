import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { QuestionariesService } from "src/questionaries/questionaries.service";

@Injectable()
export class GetAllQuestionsForVersionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly questionaryService: QuestionariesService
    ){}

    async execute( versionId: string ) {
        try{
            await this.questionaryService.findVersionById( versionId );
            return await this.questionsService.findAllQuestionsForVersion(versionId);

        } catch( error ){
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}