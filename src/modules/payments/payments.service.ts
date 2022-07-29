import { MonthlyReport } from './../monthly-report/monthly-report.entity'
import { CreatePaymentDto } from './dtos/create-payment.dto'
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Payment } from './payment.entity'
import { UsersService } from '../users/users.service'
import { CountPoint } from 'src/utils/count-point'

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
        private readonly usersService: UsersService
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

        const user = await this.usersService.findOne({
            id: userId,
        })

        if (!user) {
            throw new NotFoundException()
        }

        try {
            const point = new CountPoint(price).count()

            createPaymentDto.calculated_point = point

            const payment = this.paymentRepo.create(createPaymentDto)

            await this.paymentRepo.save(payment)

            await this.usersService.update(userId, {
                point: user.point + point,
            })

            return payment.id
        } catch {
            throw new BadRequestException()
        }
    }
}
