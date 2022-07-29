import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IMonthlyReport } from './monthly-report.interface'

@Entity()
export class MonthlyReport implements IMonthlyReport {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    date: Date

    @Column()
    point: number
}
