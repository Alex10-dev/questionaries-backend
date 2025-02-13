import { IsBoolean, IsDate, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAnswerDto {

    @IsOptional()
    @IsString()
    @MaxLength(100, { message: "Answer length must be less than or equal 100" })
    textAnswer?: string;
}
