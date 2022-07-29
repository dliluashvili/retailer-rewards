import { CreateMonthlyReportDto } from './dtos/create-monthly-report.dto'
import { PaymentsService } from 'src/modules/payments/payments.service'
import { MonthlyReport } from './monthly-report.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class MonthlyReportService {
    constructor(
        @InjectRepository(MonthlyReport)
        private readonly monthlyReportRepo: Repository<MonthlyReport>,
        private readonly paymentsService: PaymentsService
    ) {}

    async find(
        filter: FindManyOptions<MonthlyReport> = {}
    ): Promise<MonthlyReport[]> {
        return this.monthlyReportRepo.find(filter)
    }

    async create(
        createMonthlyReportDto: CreateMonthlyReportDto
    ): Promise<MonthlyReport> {
        const report = this.monthlyReportRepo.create(createMonthlyReportDto)

        return this.monthlyReportRepo.save(report)
    }
}
