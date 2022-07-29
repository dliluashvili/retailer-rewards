import { MonthlyReportModule } from './../../../modules/monthly-report/monthly-report.module';
import { Module } from '@nestjs/common'
import { PaymentsModule } from '../../../modules/payments/payments.module'
import { MonthlyReportSeederService } from './monthly-report-seeder.service'

@Module({
    imports: [PaymentsModule, MonthlyReportModule],
    providers: [MonthlyReportSeederService],
    exports: [MonthlyReportSeederService],
})
export class MonthlyReportSeederModule {}
