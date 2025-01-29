import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionaryDto } from './dto/create-questionary.dto';
import { UpdateQuestionaryDto } from './dto/update-questionary.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QuestionariesService {

  constructor(private prismaService: PrismaService){}

  async create(createQuestionaryDto: CreateQuestionaryDto) {
    try{
      const newVersionDto = plainToInstance(CreateVersionDto, {
        title: 'Versión 1',
        isActive: true,
      });

      // ✅ Validar manualmente
      const errors = validateSync(newVersionDto);
      if (errors.length > 0) {
        throw new BadRequestException(errors.map(err => Object.values(err.constraints!)).join(', '));
      }

      const transaction = await this.prismaService.$transaction(
        async (prisma) => {
          const questionary = await this.prismaService.questionary.create({
            data: {
              name: createQuestionaryDto.name,
              description: createQuestionaryDto.description,
              instructions: createQuestionaryDto.instructions,
              isActive: createQuestionaryDto.isActive
            }
          });

          await this.createVersion(questionary.id, newVersionDto);

          return questionary;
        }
      );

      return transaction;

    } catch( error ) {
      throw new InternalServerErrorException(`${ error }`);
    }
  }

  async findAll() {
    return await this.prismaService.questionary.findMany();
    // return `This action returns all questionaries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionary`;
  }

  update(id: number, updateQuestionaryDto: UpdateQuestionaryDto) {
    return `This action updates a #${id} questionary`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionary`;
  }


  //questionary versions
  async createVersion(questionaryId: string, createVersionDto: CreateVersionDto) {
    try{
      const version = await this.prismaService.questionaryVersion.create({
        data: {
          title: createVersionDto.title,
          isActive: createVersionDto.isActive,
          startActiveDate: createVersionDto.startActiveDate,
          questionaryId,
        }
      });

      return version;

    } catch( error ){
      throw new InternalServerErrorException(`${ error }`);
    }
  }

  async deleteVersion(questionaryId: string, versionId: string) {
    try{
      const versionExist = await this.prismaService.questionaryVersion.findUnique({
        where: {id: versionId}
      });

      if( !versionExist ) throw new BadRequestException(`Questionary Version with id: ${versionId} doesn't exist`);
      if( versionExist.questionaryId != questionaryId ) throw new BadRequestException(`The version doesn't contain the same questionaryId: ${questionaryId}`);
      
      const deletedVersion = await this.prismaService.questionaryVersion.delete({
        where: {id: versionId, questionaryId: questionaryId}
      });

      return { id: deletedVersion.id };

    } catch( error ) {
      throw new InternalServerErrorException(`${ error.message }`);
    }
  }
}
