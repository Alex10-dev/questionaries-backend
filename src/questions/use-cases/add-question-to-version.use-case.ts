import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { QuestionariesService } from "src/questionaries/questionaries.service";
import { GetQuestionByID } from "./get-question-by-id";

@Injectable()
export class AddQuestionToVersionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly questionariesService: QuestionariesService,
        private readonly getQuestionById: GetQuestionByID,
    ){}

    async execute(questionsId: string, versionId: string) {
        try {
            const question = await this.getQuestionById.execute(questionsId);
            const version = await this.questionariesService.findVersionById( versionId );

            const relation = await this.questionsService.findQuestionInVersion(question.id, version.id);
            if( relation ) throw new BadRequestException(`The question with id: ${ questionsId } has already been added to the questionary version: ${versionId}`);

            const linkedQuestion = await this.questionsService.linkQuestionToVersion(question.id, version.id);

            if( !linkedQuestion ) throw new InternalServerErrorException(`Couldn't add question ${questionsId} to questionary version ${versionId}`);
            return linkedQuestion;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}