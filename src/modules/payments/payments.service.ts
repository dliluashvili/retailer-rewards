import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Payment } from './payment.entity'

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly payment: Repository<Payment>
    ) {}

    create(createPaymentDto: CreatePaymentDto) {
        return createPaymentDto
    }
}
