import { CustomBadRequestException } from './../../exceptions/custom-bad-request.exception'
import { OVERDOLLARSPENT } from './../../constants/index'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserPointService {
    calculate(price: number): number {
        if (price < 1) {
            throw new CustomBadRequestException(
                'An incorrect price is provided'
            )
        }

        const overDollars = Object.keys(OVERDOLLARSPENT).map((key) =>
            parseInt(key)
        )

        return overDollars.reduce((point, value) => {
            const overDollarPoint = OVERDOLLARSPENT[value]

            if (price > value) {
                point += (price - value) * overDollarPoint
            }

            return point
        }, 0)
    }
}
