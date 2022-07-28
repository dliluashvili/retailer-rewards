import { IPayment } from './payment.interface'

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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

    @Column()
    created_at: Date
}
