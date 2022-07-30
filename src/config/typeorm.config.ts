import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { defaultConfig } from './typeorm.default.config'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            ...defaultConfig(this.configService),
            synchronize: true,
            logging: true,
            autoLoadEntities: false,
        } as TypeOrmModuleOptions
    }
}
