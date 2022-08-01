import { CustomBadRequestException } from './../../exceptions/custom-bad-request.exception'
import { PaymentCreatedEvent } from './../../events/payment-created.event'
import { MonthlyReport } from './../monthly-report/monthly-report.entity'
import { CreatePaymentDto } from './dtos/create-payment.dto'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Payment } from './payment.entity'
import { UsersService } from '../users/users.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UserPointService } from '../users/user-point.service'
import { UserNotFoundException } from '../../exceptions/user-not-found.exception'

@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name)

    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
        private readonly userPointService: UserPointService,
        private readonly usersService: UsersService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async find(filter: FindManyOptions<Payment> = {}): Promise<Payment[]> {
        return this.paymentRepo.query(`select
        u.id as user_id,
        u.firstname,
        u.lastname,
        u.email,
        payments.*
    from payments
    left join users u on u.id = payments.user_id`)
    }

    async monthly(): Promise<MonthlyReport[]> {
        return this.paymentRepo.query(`select
        u.id as user_id,
        u.firstname,
        u.lastname,
        u.email,
        DATE_TRUNC('month',payments.created_at) as date,
        SUM(calculated_point) as point
    from payments
    left join users u on u.id = payments.user_id
    GROUP BY date, u.id;
            `)
    }

    async create(createPaymentDto: CreatePaymentDto): Promise<number> {
        const { price, user_id: userId } = createPaymentDto

        this.logger.log(`Start create payment user[${userId}]`)

        const user = await this.usersService.findOne({
            id: userId,
        })

        if (!user) {
            throw new UserNotFoundException(`User id ${userId}`)
        }

        this.logger.log(`user exists on id: ${userId}`)

        try {
            this.logger.log(
                `start point calculation for user: ${userId} - price ${price}`
            )

            const point = this.userPointService.calculate(price)

            this.logger.log(
                `end point calculation for user: ${userId} - price ${price} - point ${point}`
            )

            createPaymentDto.calculated_point = point

            const _payment = this.paymentRepo.create(createPaymentDto)

            const payment = await this.paymentRepo.save(_payment)

            this.logger.log(
                `successfully created payment for user: ${userId} - payment - ${payment.id}`
            )

            this.eventEmitter.emit(
                'payment.created',
                new PaymentCreatedEvent(userId, point)
            )

            this.logger.log(`sent payment.created event to user: ${userId}`)

            return payment.id
        } catch (error) {
            throw new CustomBadRequestException(error.message)
        }
    }
}
