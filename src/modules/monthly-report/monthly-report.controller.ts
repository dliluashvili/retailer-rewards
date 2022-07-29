import { MonthlyReportService } from './monthly-report.service'
import { Controller, Get, Query } from '@nestjs/common'
import { IFilterQuery } from './filter-query.interface'

@Controller('monthly-report')
export class MonthlyReportController {
    constructor(private readonly monthlyReportService: MonthlyReportService) {}

    @Get()
    find() {
        return this.monthlyReportService.find()
    }

    @Get('/quarters')
    quarters(@Query() query: IFilterQuery) {
        return this.monthlyReportService.quarters(query)
    }
}
