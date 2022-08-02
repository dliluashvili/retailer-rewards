import { User } from './user.entity'
import { HttpCustomException } from '../../exceptions/http-custom.exception'
import { Body, Controller, Get, Logger, Post } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name)
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async find(): Promise<User[]> {
        this.logger.log(`Received new findall users request`)

        try {
            const users = await this.usersService.find()

            return users
        } catch (err) {
            throw new HttpCustomException(err.message, err.status)
        }
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        this.logger.log(`Received new create user request`)

        try {
            const user = await this.usersService.create(createUserDto)

            return user
        } catch (err) {
            throw new HttpCustomException(err.message, err.status)
        }
    }
}
