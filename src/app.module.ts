import { TypeOrmConfigService } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
