import { IPayment } from './payment.interface'

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../users/user.entity'

@Entity({
    name: 'payments',
})
export class Payment implements IPayment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    price: number

    @Column()
    product: string

    @ManyToOne(() => User, (user) => user.payments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
    })
    user: User

    @Column()
    description: string

    @Column({
        default: 0,
    })
    calculated_point: number

    @Column({
        default: 'now()',
    })
    created_at: Date
}
