import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { QuestionsService } from "../questions.service";
import { QuestionariesService } from "src/questionaries/questionaries.service";
import { GetQuestionByID } from "./get-question-by-id";

@Injectable()
export class RemoveQuestionFromVersionUseCase {

    constructor(
        private readonly questionsService: QuestionsService,
        private readonly questionariesService: QuestionariesService,
        private readonly getQuestionByIdUseCase: GetQuestionByID
    ){}

    async execute(questionsId: string, versionId: string) {
        try {
            const question = await this.getQuestionByIdUseCase.execute(questionsId);
            const version = await this.questionariesService.findVersionById(versionId);

            const relation = await this.questionsService.findQuestionInVersion(question.id, version.id);
            if( !relation ) throw new BadRequestException(`The question with id: ${questionsId} isn't related to the questionary version with id: ${versionId}`);

            return await this.questionsService.removeQuestionFromVersion(question.id, version.id);

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }

    }
}