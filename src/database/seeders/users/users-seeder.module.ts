import { Module } from '@nestjs/common'
import { UsersModule } from '../../../modules/users/users.module'
import { UserSeederService } from './users-seeder.service'

@Module({
    imports: [UsersModule],
    providers: [UserSeederService],
    exports: [UserSeederService],
})
export class UsersSeederModule {}
