import { INestApplicationContext, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Seeder } from './seeder'
import { SeederModule } from './seeders.module'

async function bootstrap() {
    let appContext: INestApplicationContext

    try {
        appContext = await NestFactory.createApplicationContext(SeederModule)
        const logger = appContext.get(Logger)
        const seeder = appContext.get(Seeder)

        await seeder.run()

        logger.log('Seeder has been completed!')
    } catch (error) {
        Logger.error('Error', error)
        throw error
    } finally {
        appContext.close()
    }
}

bootstrap()
