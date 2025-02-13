import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { SolutionsService } from "../solutions.service";
import { CreateSolutionDto } from "../dto/create-solution.dto";
import { GetAllQuestionsForVersionUseCase } from "src/questions/use-cases/get-all-questions-for-version.use-case";
import { Answer, Question } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CreateNewSolutionUseCase {

    constructor(
        private readonly solutionsService: SolutionsService,
        private readonly prismaService: PrismaService,
        private readonly findQuestionsFromVersion: GetAllQuestionsForVersionUseCase,
    ){}

    async execute(versionId: string, createSolutionDto: CreateSolutionDto) {
        try {
            const questions = await this.findQuestionsFromVersion.execute(versionId)

           if( questions.length < 1 ) throw new BadRequestException(`The questionary version ${versionId} doesn't have questions`);

           const transaction = await this.prismaService.$transaction(
                async (prisma) => {

                    const newSolution = await this.solutionsService.createSolution(versionId, {
                        questionaryVersionId: versionId,
                        ended: false,
                    });

                    const newAnswers: Partial<Answer>[] = questions.map( (element) => {
                        return {
                            solutionId: newSolution.id,
                            questionId: element.question.id,
                        }
                    });

                    const answers = await this.solutionsService.createAnswersForNewSolution( newAnswers );

                    return {
                        solution: {...newSolution},
                        answers,
                    }

                }
            )

            return transaction;


        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}