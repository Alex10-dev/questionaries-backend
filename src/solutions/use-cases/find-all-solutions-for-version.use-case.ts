import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { SolutionsService } from "../solutions.service";
import { QuestionariesService } from "src/questionaries/questionaries.service";

@Injectable()
export class findAllSolutionsForVersionUseCase {

    constructor(
        private readonly solutionsService: SolutionsService,
        private readonly questionariesService: QuestionariesService,
    ){}

    async execute(versionId: string) {
        try {
            await this.questionariesService.findVersionById(versionId);
            return await this.solutionsService.findAllSolutionsForVersion(versionId);

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}