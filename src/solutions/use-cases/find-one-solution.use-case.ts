import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SolutionsService } from "../solutions.service";
import { QuestionariesService } from "src/questionaries/questionaries.service";

@Injectable()
export class FindOneSolutionUseCase {

    constructor(
        private readonly solutionsService: SolutionsService,
        private readonly questionariesService: QuestionariesService,
    ){}

    async execute(solutionId: string, versionId: string) {
        try {
            await this.questionariesService.findVersionById(versionId);
            const solution = await this.solutionsService.findOneSolution(solutionId);

            if( !solution ) throw new NotFoundException(`Solution with id ${solutionId} doesn't exist`);
            if( solution.questionaryVersionId != versionId ) 
                throw new BadRequestException(`Solution with id: ${solutionId} isn't related to questionary version with id: ${versionId}`);

            return solution;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}