import { HttpCustomException } from '../../exceptions/http-custom.exception'
import { MonthlyReport } from './monthly-report.entity'
import { MonthlyReportService } from './monthly-report.service'
import { Controller, Get, Logger, Query } from '@nestjs/common'
import { IFilterQuery } from './filter-query.interface'

@Controller('monthly-report')
export class MonthlyReportController {
    private readonly logger = new Logger(MonthlyReportController.name)
    constructor(private readonly monthlyReportService: MonthlyReportService) {}

    @Get()
    async find() {
        this.logger.log(`Received new findall monthly reports request`)
        try {
            const monthlyReports = await this.monthlyReportService.find()

            return monthlyReports
        } catch (err) {
            throw new HttpCustomException(err.message, err.status)
        }
    }

    @Get('/quarters')
    async quarters(@Query() query: IFilterQuery) {
        this.logger.log(
            `Received new monthly reports by quarters request with filters: ${query}`
        )
        try {
            const quarters = await this.monthlyReportService.quarters(query)
            return quarters
        } catch (err) {
            throw new HttpCustomException(err.message, err.status)
        }
    }
}
