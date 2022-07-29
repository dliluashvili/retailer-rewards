import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreatePaymentDto } from './dtos/create-payment.dto'
import { PaymentsService } from './payments.service'

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Get('/monthly')
    monthly() {
        return this.paymentsService.monthly()
    }

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto)
    }
}
