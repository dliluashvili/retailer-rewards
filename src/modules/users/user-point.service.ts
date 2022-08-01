import { OVERDOLLARSPENT } from './../../constants/index'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserPointService {
    calculate(price: number): number {
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
