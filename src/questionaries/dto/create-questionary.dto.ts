import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateQuestionaryDto {
    @IsString()
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @MaxLength(30, { message: "El nombre no puede tener más de 30 caracteres" })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    instructions?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}