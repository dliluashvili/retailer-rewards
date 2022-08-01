import { HttpExceptionFilter } from './filters/http-exception.filter'
import { TypeOrmConfigService } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module, Scope } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { MonthlyReportModule } from './modules/monthly-report/monthly-report.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { LoggingInterceptor } from './interceptors/logging.interceptor'

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
    providers: [
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
