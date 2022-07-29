import { MonthlyReportSeederModule } from './monthly-report/monthly-report-seeder.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PaymentsSeederModule } from './payments/payments-seeder.module'
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
        EventEmitterModule.forRoot(),
        UsersSeederModule,
        PaymentsSeederModule,
        MonthlyReportSeederModule,
    ],
    providers: [Logger, Seeder],
})
export class SeederModule {}
