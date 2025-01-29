import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionaryDto } from './create-questionary.dto';

export class UpdateQuestionaryDto extends PartialType(CreateQuestionaryDto) {}
