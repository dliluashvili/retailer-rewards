import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class UserSeederService {
    constructor(private readonly usersService: UsersService) {}

    create() {
        const user: CreateUserDto = {
            firstname: 'Datka',
            lastname: 'Liluashvili',
            email: 'dato@gmail.com',
        }
        
        return this.usersService.create(user)
    }
}
