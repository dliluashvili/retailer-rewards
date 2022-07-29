import { MonthlyReportService } from './../../../modules/monthly-report/monthly-report.service'
import { Injectable } from '@nestjs/common'
import { ISeeder } from '../interfaces/seeder.interface'
import { PaymentsService } from '../../../modules/payments/payments.service'
import { Payment } from 'src/modules/payments/payment.entity'

@Injectable()
export class MonthlyReportSeederService implements ISeeder<Payment> {
    constructor(
        private readonly monthlyReportService: MonthlyReportService,
        private readonly paymentsService: PaymentsService
    ) {}

    async create() {
        const monthlyReportData = await this.paymentsService.monthly()

        for (const item of monthlyReportData) {
            await this.monthlyReportService.create(item)
        }

        return 'created'
    }
}
