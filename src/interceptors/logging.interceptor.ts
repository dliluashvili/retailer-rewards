import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name)

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const userAgent = request.get('user-agent') || ''
        const { ip, method, path: url } = request

        const requestLogData = {
            ip,
            userAgent,
            method,
            url,
            context: context.getClass().name,
            handler: context.getHandler().name,
            timestamp: new Date().toISOString(),
        }

        this.logger.log('====Request Log:====', requestLogData)

        const now = Date.now()

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse()

                const { statusCode } = response

                const responseLogData = {
                    statusCode,
                    timestamp: new Date().toISOString(),
                    time: Date.now() - now,
                }

                this.logger.log('====Response Log:====', responseLogData)
            })
        )
    }
}
