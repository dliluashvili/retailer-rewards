import { IMonthlyReport } from '../monthly-report.interface'

export class CreateMonthlyReportDto implements IMonthlyReport {
    user_id: number
    date: Date
    point: number
}
