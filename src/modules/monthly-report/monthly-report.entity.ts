import { User } from '../users/user.entity'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { IMonthlyReport } from './monthly-report.interface'

@Entity()
export class MonthlyReport implements IMonthlyReport {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    date: Date

    @ManyToOne(() => User, (user) => user.monthly_reports, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user: User

    @Column()
    quarter: number

    @Column()
    point: number
}
