import { TypeOrmConfigService } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { MonthlyReportModule } from './modules/monthly-report/monthly-report.module';
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        EventEmitterModule.forRoot(),
        UsersModule,
        PaymentsModule,
        MonthlyReportModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
