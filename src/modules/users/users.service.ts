import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dtos/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepo.create(createUserDto)

        return this.userRepo.save(user)
    }
}
