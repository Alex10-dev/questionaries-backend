import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateQuestionaryDto } from './dto/create-questionary.dto';
import { UpdateQuestionaryDto } from './dto/update-questionary.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateVersionDto } from './dto/update-version.dto';

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
        async () => {
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
    try{
      const questionaries = await this.prismaService.questionary.findMany();

      if( !questionaries ) throw new NotFoundException(`There are no questionaries in the data base`);

      return questionaries;

    } catch( error ) {
      if( error instanceof HttpException ) throw error;

      throw new InternalServerErrorException(`${error}`);
    }
  }

  async findOne(id: string) {
    try{
      const questionary = await this.prismaService.questionary.findUnique({
        where: {id}
      });

      if( !questionary ) throw new NotFoundException(`Questionary with id: ${ id } doesn't exist`);
      return questionary;

    } catch( error ) {

      if( error instanceof HttpException ) throw error;
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async update(id: string, updateQuestionaryDto: UpdateQuestionaryDto) {
    try{
      await this.findOne(id);

      const updatedQuestionary = await this.prismaService.questionary.update({
        data: {
          name: updateQuestionaryDto.name,
          isActive: updateQuestionaryDto.isActive,
          description: updateQuestionaryDto.description,
          instructions: updateQuestionaryDto.instructions,
        },
        where: {id}
      });

      return updatedQuestionary;

    } catch( error ) {
      if( error instanceof HttpException ) throw error;
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async remove(id: string) {
    try{
      await this.findOne(id);
      const deletedVersions = await this.deleteAllQuestionaryVersions(id);
      const deletedQuestionary = await this.prismaService.questionary.delete({
        where: {id}
      });

      return { 
        questionaryId: deletedQuestionary.id,
        deletedVersions: deletedVersions.deletedVersions,
        message: `Successfully deleted questionary with id: ${deletedQuestionary.id}.`
      };

    } catch( error ) {
      if ( error instanceof HttpException ) throw error;
      throw new InternalServerErrorException(`${error}`);
    }
  }

  //questionary versions
  async createVersion(questionaryId: string, createVersionDto: CreateVersionDto) {
    try{
      await this.findOne(questionaryId);
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

  async findOneVersion(questionaryId: string, versionId: string) {
    try{
      const version = await this.prismaService.questionaryVersion.findUnique({
        where: {id: versionId}
      });

      if( !version ) throw new BadRequestException(`Questionary Version with id: ${versionId} doesn't exist`);
      if( version.questionaryId != questionaryId ) throw new BadRequestException(`The version doesn't contain the same questionaryId: ${questionaryId}`);
      
      return version;

    } catch( error ) {
      if ( error instanceof HttpException ) throw error;

      throw new InternalServerErrorException(`${error}`);
    }
  }

  async findVersionById(versionId: string) {
    try{
      const version = await this.prismaService.questionaryVersion.findUnique({
        where: {id: versionId}
      });

      if( !version ) throw new BadRequestException(`Questionary Version with id: ${versionId} doesn't exist`);
      
      return version;

    } catch( error ) {
      if ( error instanceof HttpException ) throw error;

      throw new InternalServerErrorException(`${error}`);
    }
  }

  async findAllVersions(questionaryId: string) {
    try{
      await this.findOne(questionaryId);
      const versions = await this.prismaService.questionaryVersion.findMany({
        where: {questionaryId: questionaryId}
      });

      if( !versions ) throw new NotFoundException(`There are no versions for the questionary with id: ${ questionaryId }`);
      
      return versions;

    } catch( error ) {
      if ( error instanceof HttpException ) throw error;

      throw new InternalServerErrorException(`${error}`);
    }
  }

  async updateVersion(questionaryId: string, versionId: string, updateVersionDto: UpdateVersionDto) {
    try{
      await this.findOne(questionaryId);
      await this.findOneVersion(questionaryId, versionId);

      const updatedVersion = await this.prismaService.questionaryVersion.update({
        data: {
          title: updateVersionDto.title,
          isActive: updateVersionDto.isActive,
          endActiveDate: updateVersionDto.endActiveDate
        },
        where: {id: versionId, questionaryId: questionaryId}
      });

      return updatedVersion;

    } catch( error ) {
      if ( error instanceof HttpException ) throw error;

      throw new InternalServerErrorException(`${error}`);
    }
  }

  async deleteVersion(questionaryId: string, versionId: string) {
    try{
      await this.findOne(questionaryId);
      await this.findOneVersion(questionaryId, versionId);

      const deletedVersion = await this.prismaService.questionaryVersion.delete({
        where: {id: versionId, questionaryId: questionaryId}
      });

      return { id: deletedVersion.id };

    } catch( error ) {
      if ( error instanceof HttpException ) throw error;

      throw new InternalServerErrorException(`${error}`);
    }
  }

  async deleteAllQuestionaryVersions(questionaryId: string) {
    try{
      await this.findOne(questionaryId);
      
      const deletedVersions = await this.prismaService.questionaryVersion.deleteMany({
        where: { questionaryId: questionaryId }
      });

      return {
        questionaryId: questionaryId,
        deletedVersions: deletedVersions.count,
        message: ( deletedVersions.count === 0 ) 
          ? `There aren't version(s) from questionary with id: ${questionaryId}.`
          : `Successfully deleted ${deletedVersions.count} version(s) from questionary with id: ${questionaryId}.`
      };

    } catch( error ) {
      if ( error instanceof HttpException ) throw error;
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
