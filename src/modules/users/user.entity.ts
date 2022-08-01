import { MonthlyReport } from './../monthly-report/monthly-report.entity'
import { IUser } from './user.interface'
import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm'
import { Payment } from '../payments/payment.entity'

@Entity({
    name: 'users',
})
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({
        unique: true,
    })
    email: string

    @Column({
        default: 0,
    })
    point?: number

    @OneToMany(() => Payment, (payment) => payment.user)
    payments?: Payment[]

    @OneToMany(() => MonthlyReport, (monthlyReport) => monthlyReport.user)
    monthly_reports?: MonthlyReport[]

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date
}
