import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './user.entity'
import { UserPointService } from './user-point.service'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UserPointService],
    exports: [UsersService, UserPointService],
})
export class UsersModule {}
