import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../../../modules/users/dtos/create-user.dto'
import { UsersService } from '../../../modules/users/users.service'
import { faker } from '@faker-js/faker'
import { ISeeder } from '../interfaces/seeder.interface'

@Injectable()
export class UserSeederService implements ISeeder<CreateUserDto> {
    constructor(private readonly usersService: UsersService) {}

    async create() {
        for (let i = 0; i < 10; i++) {
            const user = await this.generate()

            await this.usersService.create(user)
        }

        return 'created'
    }

    async generate(): Promise<CreateUserDto> {
        const firstname = faker.name.firstName()

        const email = `${firstname.toLowerCase()}@gmail.com`

        const found = await this.usersService.findOne({ email })

        if (found) {
            return this.generate()
        }

        const lastname = faker.name.lastName()

        return {
            firstname,
            lastname,
            email,
        }
    }
}
