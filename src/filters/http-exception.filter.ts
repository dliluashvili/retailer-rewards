import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { HttpCustomException } from 'src/exceptions/http-custom.exception'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name)

    catch(exception: HttpCustomException, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse<Response>()
        const request = context.getRequest<Request>()

        const status = exception.getStatus()

        const exceptionData = {
            statusCode: status,
            path: request.url,
            message: exception.message,
            timestamp: new Date().toISOString(),
        }

        const exceptionLogData = {
            ...exceptionData,
            user_id: request.body.user_id,
            logData: exception.logData,
        }

        this.logger.error('Error', exceptionLogData)

        response.status(status).json(exceptionData)
    }
}
