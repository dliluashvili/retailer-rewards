export class PaymentCreatedEvent {
    constructor(
        public readonly user_id: number,
        public readonly point: number
    ) {}
}
