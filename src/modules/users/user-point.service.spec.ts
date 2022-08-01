import { CustomBadRequestException } from './../../exceptions/custom-bad-request.exception'
import { Test } from '@nestjs/testing'
import { UserPointService } from './user-point.service'

describe('UserPointService', () => {
    let service: UserPointService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [UserPointService],
        }).compile()

        service = module.get<UserPointService>(UserPointService)
    })

    it('can create an instance of user point service', () => {
        expect(service).toBeDefined()
    })

    it('point calculation when correct price is provided', () => {
        const price = 120

        const point = service.calculate(price)

        expect(point).toBe(90)
    })

    it('trow an error when price is less than 1', () => {
        const price = 0

        expect(() => service.calculate(price)).toThrow(
            CustomBadRequestException
        )
    })
})
