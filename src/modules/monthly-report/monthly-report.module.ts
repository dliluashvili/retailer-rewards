import { MonthlyReport } from './monthly-report.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { MonthlyReportService } from './monthly-report.service'
import { MonthlyReportController } from './monthly-report.controller'
import { PaymentsModule } from '../payments/payments.module'

@Module({
    imports: [TypeOrmModule.forFeature([MonthlyReport]), PaymentsModule],
    providers: [MonthlyReportService],
    controllers: [MonthlyReportController],
    exports: [MonthlyReportService],
})
export class MonthlyReportModule {}
