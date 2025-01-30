import { IsBoolean, IsDate, IsOptional, IsString, MAX_LENGTH, MaxLength, MinLength } from "class-validator";

export class UpdateVersionDto {
    @IsString()
    @MinLength(3, { message: "El titulo debe tener al menos 3 caracteres" })
    @MaxLength(40, { message: "El titulo no puede tener más de 40 caracteres" })
    title: string;

    @IsDate()
    @IsOptional()
    endActiveDate?: Date;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}