import { HttpCustomException } from '../../exceptions/http-custom.exception'
import { Body, Controller, Get, Logger, Post } from '@nestjs/common'
import { CreatePaymentDto } from './dtos/create-payment.dto'
import { PaymentsService } from './payments.service'
import { Payment } from './payment.entity'

@Controller('payments')
export class PaymentsController {
    private readonly logger = new Logger(PaymentsController.name)

    constructor(private readonly paymentsService: PaymentsService) {}

    @Get()
    async find(): Promise<Payment[]> {
        this.logger.log(`Received new findall payments request`)

        try {
            const payments = await this.paymentsService.find()

            return payments
        } catch (err) {
            throw new HttpCustomException(err.message, err.status)
        }
    }

    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto): Promise<number> {
        this.logger.log(
            `Received new create payment request from user- ${createPaymentDto.user_id}`
        )
        try {
            const paymentId = await this.paymentsService.create(
                createPaymentDto
            )

            return paymentId
        } catch (err) {
            throw new HttpCustomException(err.message, err.status)
        }
    }

    @Get('/monthly')
    monthly() {
        return this.paymentsService.monthly()
    }
}
