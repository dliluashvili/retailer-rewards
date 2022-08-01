import { UserPointService } from './../../../modules/users/user-point.service'
import { faker } from '@faker-js/faker'
import { UsersService } from '../../../modules/users/users.service'
import { CreatePaymentDto } from './../../../modules/payments/dtos/create-payment.dto'
import { Injectable } from '@nestjs/common'
import { ISeeder } from '../interfaces/seeder.interface'
import { PaymentsService } from '../../../modules/payments/payments.service'
import * as moment from 'moment'

@Injectable()
export class PaymentsSeederService implements ISeeder<CreatePaymentDto> {
    constructor(
        private readonly usersService: UsersService,
        private readonly userPointService: UserPointService,
        private readonly paymentsService: PaymentsService
    ) {}

    async create() {
        const users = await this.usersService.find()

        for await (const user of users) {
            const months = ['2022-08', '2022-09', '2022-10']

            for (const m of months) {
                const month = moment(m)

                const endOfMonth = parseInt(
                    month.clone().endOf('month').format('DD')
                )

                for (let i = 1; i <= endOfMonth; i++) {
                    const day = i > 9 ? `${i}` : `0${i}`
                    const date = new Date(`${m}-${day}`)

                    const payment = this.generate({
                        user_id: user.id,
                        created_at: date,
                    })

                    await this.paymentsService.create(payment)
                }
            }
        }

        return 'created'
    }

    generate(params: Partial<CreatePaymentDto>): CreatePaymentDto {
        const price = faker.datatype.number({
            min: 20,
            max: 500,
        })

        return {
            user_id: params.user_id,
            product: `test_product_${faker.random.numeric(4, {
                bannedDigits: ['0'],
            })}`,
            created_at: params.created_at,
            calculated_point: this.userPointService.calculate(price),
            description: faker.lorem.sentence(),
            price,
        }
    }
}
