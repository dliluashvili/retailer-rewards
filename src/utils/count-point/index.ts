export class CountPoint {
    private readonly pointOver50 = 1
    private readonly pointOver100 = 1

    constructor(private price: number) {
        this.price = price
    }

    count(): number {
        let point = 0

        if (this.price > 50) {
            point += this.countOver50()
        }

        if (this.price > 100) {
            point += this.countOver100()
        }

        return point
    }

    private countOver50(): number {
        return (this.price - 50) * this.pointOver50
    }

    private countOver100(): number {
        return (this.price - 100) * this.pointOver100
    }
}
