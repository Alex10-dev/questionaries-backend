import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { SolutionsService } from "../solutions.service";

@Injectable()
export class findAllSolutionsUseCase {

    constructor(
        private readonly solutionsService: SolutionsService,
    ){}

    async execute() {
        try {
            return await this.solutionsService.findAllSolutions();

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}