import { IsBoolean, IsDate, IsOptional } from "class-validator";

export class CreateSolutionDto {

    @IsOptional()
    @IsDate()
    endedAt?: Date;

    @IsOptional()
    @IsBoolean()
    ended?: boolean;
}
