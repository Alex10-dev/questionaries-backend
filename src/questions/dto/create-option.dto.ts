import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOptionDto {

    @IsString()
    @MinLength(5, { message: "Option length must be greater than 4" })
    @MaxLength(100, { message: "Option length must be less than or equal 100" })
    text: string;

    @IsOptional()
    @IsBoolean()
    isCorrect?: boolean;
}
