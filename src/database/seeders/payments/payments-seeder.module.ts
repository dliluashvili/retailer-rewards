import { Module } from '@nestjs/common'
import { PaymentsModule } from '../../../modules/payments/payments.module'
import { UsersModule } from '../../../modules/users/users.module'
import { PaymentsSeederService } from './payments-seeder.service'

@Module({
    imports: [UsersModule, PaymentsModule],
    providers: [PaymentsSeederService],
    exports: [PaymentsSeederService]
})
export class PaymentsSeederModule {}
