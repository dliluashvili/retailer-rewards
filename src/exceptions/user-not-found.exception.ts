import { HttpStatus } from '@nestjs/common'
import { HttpCustomException } from './http-custom.exception'

export class UserNotFoundException extends HttpCustomException {
    constructor(logData: any = null) {
        super('User not found', HttpStatus.NOT_FOUND)
        this.logData = logData
    }
}
