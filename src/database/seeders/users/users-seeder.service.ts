import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto'
import { UsersService } from 'src/modules/users/users.service'
import { faker } from '@faker-js/faker'

@Injectable()
export class UserSeederService {
    constructor(private readonly usersService: UsersService) {}

    async create() {
        for (let i = 0; i < 50; i++) {
            const user = await this.generateUser()

            await this.usersService.create(user)
        }

        return 'created'
    }

    async generateUser(): Promise<CreateUserDto> {
        const firstname = faker.name.firstName()

        const email = `${firstname.toLowerCase()}@gmail.com`

        const found = await this.usersService.findOne({ email })

        if (found) {
            return this.generateUser()
        }

        const lastname = faker.name.lastName()

        return {
            firstname,
            lastname,
            email,
        }
    }
}
