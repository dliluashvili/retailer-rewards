import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { PaymentsController } from './payments.controller'
import { Payment } from './payment.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Payment])],
    providers: [PaymentsService],
    controllers: [PaymentsController],
})
export class PaymentsModule {}
