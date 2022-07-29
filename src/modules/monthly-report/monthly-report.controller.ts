import { MonthlyReportService } from './monthly-report.service'
import { Controller, Get } from '@nestjs/common'

@Controller('monthly-report')
export class MonthlyReportController {
    constructor(private readonly monthlyReportService: MonthlyReportService) {}
    @Get()
    find() {
        return this.monthlyReportService.find()
    }
}
