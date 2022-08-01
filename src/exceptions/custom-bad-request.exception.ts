import { HttpStatus } from '@nestjs/common';
import { HttpCustomException } from './http-custom.exception';
export class CustomBadRequestException extends HttpCustomException {
    constructor(logData: any = null) {
        super('Bad Request', HttpStatus.BAD_REQUEST)
        this.logData = logData
    }
} 