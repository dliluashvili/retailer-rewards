export interface IPayment {
    id?: number
    user_id: number
    price: number
    product: string
    description: string
    created_at?: Date
    updated_at?: Date
}
