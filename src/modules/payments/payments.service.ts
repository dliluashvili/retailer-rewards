import { CreatePaymentDto } from './dtos/create-payment.dto'
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Payment } from './payment.entity'
import { UsersService } from '../users/users.service'
import { IPayment } from './payment.interface'
import { CountPoint } from 'src/utils/count-point'

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
        private readonly usersService: UsersService
    ) {}

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
