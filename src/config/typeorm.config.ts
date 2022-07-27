import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            name: 'default',
            type: 'postgres',
            host: this.configService.get('POSTGRES_HOST'),
            port: 5432,
            username: this.configService.get('POSTGRES_USER'),
            password: this.configService.get('POSTGRES_PASSWORD'),
            database: this.configService.get('POSTGRES_DATABASE'),
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
            logging: true,
            autoLoadEntities: true,
        }
    }
}
