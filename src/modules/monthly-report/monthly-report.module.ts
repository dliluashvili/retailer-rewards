import { MonthlyReport } from './monthly-report.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { MonthlyReportService } from './monthly-report.service'
import { MonthlyReportController } from './monthly-report.controller'

@Module({
    imports: [TypeOrmModule.forFeature([MonthlyReport])],
    providers: [MonthlyReportService],
    controllers: [MonthlyReportController],
})

export class MonthlyReportModule {}
