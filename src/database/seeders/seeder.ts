import { MonthlyReportSeederService } from './monthly-report/monthly-report-seeder.service'
import { PaymentsSeederService } from './payments/payments-seeder.service'
import { Injectable } from '@nestjs/common'
import { UserSeederService } from './users/users-seeder.service'

@Injectable()
export class Seeder {
    constructor(
        private readonly userSeederService: UserSeederService,
        private readonly paymentsSeederService: PaymentsSeederService,
        private readonly monthlyReportSeederService: MonthlyReportSeederService
    ) {}

    async run() {
        await this.userSeederService.create()
        await this.paymentsSeederService.create()
        await this.monthlyReportSeederService.create()
    }
}
