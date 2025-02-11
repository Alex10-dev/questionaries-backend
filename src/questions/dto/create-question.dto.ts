import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { QuestionType } from "src/common/question-type.enum";

export class CreateQuestionDto {

    @IsString()
    @MinLength(5, { message: "Question length must be greater than 4" })
    @MaxLength(100, { message: "Question length must be less than or equal 100" })
    question: string;

    @IsEnum(QuestionType, { 
        message: "Question type must be TEXT, SINGLE_CHOICE or MULTIPLE_CHOICE"
    })
    type: QuestionType;

    @IsOptional()
    @IsString()
    correctAnswer?: string;

    @IsOptional()
    @IsNumber()
    value?: Number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
