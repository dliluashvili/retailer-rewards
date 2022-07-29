import { IMonthlyReport } from '../monthly-report.interface'

export class CreateMonthlyReportDto implements IMonthlyReport {
    user_id: number
    date: Date
    quarter?: number
    point: number
}
