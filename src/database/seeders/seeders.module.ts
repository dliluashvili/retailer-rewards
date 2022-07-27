import { UsersSeederModule } from './users/users-seeder.module'
import { TypeOrmConfigService } from './../../config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Seeder } from './seeder'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        UsersSeederModule,
    ],
    
    providers: [Logger, Seeder],
})
export class SeederModule {}
