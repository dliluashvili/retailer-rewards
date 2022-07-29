import { IPayment } from './payment.interface'

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

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

    @Column()
    description: string

    @Column({
        default: 0,
    })
    calculated_point: number

    @Column({
        default: 'now()'
    })
    created_at: Date
}
