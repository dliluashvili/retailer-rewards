import { HttpException, HttpStatus } from '@nestjs/common'

export class HttpCustomException extends HttpException {
    private _logData: any = null

    constructor(message: string, httpStatus: HttpStatus) {
        super(message, httpStatus)
    }

    set logData(data: any) {
        this._logData = data
    }

    get logData() {
        return this._logData
    }
}
