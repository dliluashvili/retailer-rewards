import { TypeOrmConfigService } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { PaymentsModule } from './modules/payments/payments.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        UsersModule,
        PaymentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
