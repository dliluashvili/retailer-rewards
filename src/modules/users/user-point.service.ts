import { Injectable } from '@nestjs/common'

@Injectable()
export class UserPointService {
    private readonly pointOver50 = 1
    private readonly pointOver100 = 1

    calculate(price: number): number {
        let point = 0

        if (price > 50) {
            point += this.calculateOver50(price)
        }

        if (price > 100) {
            point += this.calculateOver100(price)
        }

        return point
    }

    private calculateOver50(price: number): number {
        return (price - 50) * this.pointOver50
    }

    private calculateOver100(price: number): number {
        return (price - 100) * this.pointOver100
    }
}
