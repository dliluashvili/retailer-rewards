import { UserNotFoundException } from './../../exceptions/user-not-found.exception'
import { CreatePaymentDto } from './dtos/create-payment.dto'
import { UserPointService } from './../users/user-point.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Test, TestingModule } from '@nestjs/testing'
import { PaymentsService } from './payments.service'
import { faker } from '@faker-js/faker'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'
import { CreateUserDto } from '../users/dtos/create-user.dto'
import { FindOptionsWhere, Repository } from 'typeorm'
import { Payment } from './payment.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('PaymentsService', () => {
    let paymentService: PaymentsService
    let paymentRepository: Repository<Payment>
    let userPointService: UserPointService

    const PAYMENT_REPOSITORY_TOKEN = getRepositoryToken(Payment)

    let fakeUserService: Partial<UsersService>

    beforeEach(async () => {
        const users: User[] = []
        fakeUserService = {
            find: (): Promise<User[]> => Promise.resolve(users),
            findOne: (filter: FindOptionsWhere<User> = {}): Promise<User> => {
                const found = users.find((user) => user.id === filter.id)

                return Promise.resolve(found)
            },
            create: (user: CreateUserDto): Promise<User> => {
                const _user = {
                    id: users.length + 1,
                    ...user,
                    point: 0,
                    created_at: new Date(),
                    updated_at: new Date(),
                }

                users.push(_user)

                return Promise.resolve(_user)
            },
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaymentsService,
                UserPointService,
                EventEmitter2,
                {
                    provide: PAYMENT_REPOSITORY_TOKEN,
                    useValue: {
                        create: jest.fn().mockImplementation((dto) => dto),
                        save: jest.fn().mockImplementation((payment) =>
                            Promise.resolve({
                                id: parseInt(faker.random.numeric()),
                                ...payment,
                            })
                        ),
                    },
                },
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
            ],
        }).compile()

        paymentService = module.get<PaymentsService>(PaymentsService)
        userPointService = module.get<UserPointService>(UserPointService)

        paymentRepository = module.get<Repository<Payment>>(
            PAYMENT_REPOSITORY_TOKEN
        )

        for (let i = 1; i <= 10; i++) {
            fakeUserService.create({
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: `${faker.name.firstName().toLowerCase()}@gmail.com`,
            })
        }
    })

    it('can create an instance of payment service', () => {
        expect(paymentService).toBeDefined()
    })

    it('can create an instance of user point service', () => {
        expect(userPointService).toBeDefined()
    })

    it('paymentRepository should be defined', () => {
        expect(paymentRepository).toBeDefined()
    })

    it('can create an instance of user service', async () => {
        expect(fakeUserService).toBeDefined()
    })

    it('create payment if provided data is correct', async () => {
        const price = 120

        const createPaymentDto: CreatePaymentDto = {
            user_id: 1,
            price,
            product: 'Test prod',
            description: 'Desc',
            calculated_point: userPointService.calculate(price),
        }

        const paymentId = await paymentService.create(createPaymentDto)

        expect(typeof paymentId).toBe('number')
    })

    it('throw an error if user doesnt exist', async (done) => {
        const price = 120

        const createPaymentDto: CreatePaymentDto = {
            user_id: 2000,
            price,
            product: 'Test prod',
            description: 'Desc',
            calculated_point: userPointService.calculate(price),
        }

        try {
            await paymentService.create(createPaymentDto)
        } catch (err) {
            expect(err).toBeInstanceOf(UserNotFoundException)
        } finally {
            done()
        }
    })
})
