import { IPayment } from '../payment.interface'

export class CreatePaymentDto implements IPayment {
    user_id: number
    product: string
    description: string
}
