import { Injectable } from '@nestjs/common'
import { UserSeederService } from './users/users-seeder.service'

@Injectable()
export class Seeder {
    constructor(
        private readonly userSeederService: UserSeederService
    ) {}
    async seed() {
        return this.userSeederService.create()
    }
}
