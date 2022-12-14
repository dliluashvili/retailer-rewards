export interface IPayment {
    id?: number
    user_id: number
    price: number
    calculated_point?: number
    product: string
    description: string
    created_at?: Date
}
