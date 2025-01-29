import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

export const Envs = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: parseInt( process.env.PORT || '3000', 10),
    db_url: process.env.POSTGRES_URL
})

export const ValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    POSTGRES_URL: Joi.string().required(),
    NODE_ENV: Joi.string().default('dev'),
})

@Injectable()
export class EnvConfig {
    public readonly port: number;
    public readonly environment: string;
    public readonly dbUrl: string;

    constructor( private configService: ConfigService ){
        this.environment = this.configService.get<string>('environment', 'dev');
        this.port = this.configService.get<number>('port', 3000);
        this.dbUrl = this.configService.get<string>('db_url')!;
    }
}