import { IPayment } from '../payment.interface'

export class CreatePaymentDto implements IPayment {
    user_id: number
    price: number
    calculated_point?: number
    product: string
    description: string
    // For seeder and development purpose
    created_at?: Date
}
