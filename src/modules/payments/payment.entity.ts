import { IPayment } from './../../../dist/modules/payments/payment.interface.d'
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
    product: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
