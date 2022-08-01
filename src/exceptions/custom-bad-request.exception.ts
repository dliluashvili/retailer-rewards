import { HttpStatus } from '@nestjs/common';
import { HttpCustomException } from 'src/exceptions/http-custom.exception';
export class CustomBadRequestException extends HttpCustomException {
    constructor(logData: any) {
        super('Bad Request', HttpStatus.BAD_REQUEST)
        this.logData = logData
    }
} 