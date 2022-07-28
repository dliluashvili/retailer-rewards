export class CountPoint {
    private readonly pointOver50 = 1
    private readonly pointOver100 = 1

    constructor(private price: number) {
        this.price = price
    }

    count(): number {
        return (
            (this.price - 50) * this.pointOver50 +
            (this.price - 100) * this.pointOver100
        )
    }
}
