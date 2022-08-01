import { UserNotFoundException } from './../../exceptions/user-not-found.exception'
import { UpdateUserDto } from './dtos/update-user.dto'
import {
    BadRequestException,
    Injectable,
    Logger,
} from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, FindManyOptions, Repository } from 'typeorm'
import { CreateUserDto } from './dtos/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async find(filter: FindManyOptions<User> = {}): Promise<User[]> {
        return this.userRepo.find(filter)
    }

    findOne(filter: FindOptionsWhere<User>): Promise<User> {
        const user = this.userRepo.findOneBy(filter)

        return user
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepo.create(createUserDto)

        return this.userRepo.save(user)
    }

    async update(id: number, updateParams: Partial<User>): Promise<number> {
        const user = await this.findOne({ id })

        if (!user) {
            throw new UserNotFoundException(`User id ${id}`)
        }

        await this.userRepo.update(id, updateParams)

        return user.id
    }

    @OnEvent('payment.created', { async: true })
    async updatePoint(payload: UpdateUserDto): Promise<void> {
        this.logger.log(
            `start update point logic for user - ${payload.user_id}, point = ${payload.point}`
        )
        try {
            const user = await this.userRepo.findOneBy({
                id: payload.user_id,
            })

            const newPoint = user.point + payload.point

            await this.userRepo.update(payload.user_id, {
                point: newPoint,
            })

            this.logger.log(
                `User with id - ${payload.user_id} point ${newPoint} updated `
            )
        } catch (error) {
            throw new BadRequestException(
                `An error occured while updating user with id - ${payload.user_id} point, - ${error.message}`
            )
        }
    }
}
