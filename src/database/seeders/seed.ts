import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Seeder } from './seeder'
import { SeederModule } from './seeders.module'
async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then((appContext) => {
            const logger = appContext.get(Logger)
            const seeder = appContext.get(Seeder)
            seeder
                .seed()
                .then(() => {
                    logger.log('Seeding complete!')
                })
                .catch((error) => {
                    logger.error('Seeding failed!')
                    throw error
                })
                .finally(() => appContext.close())
        })
        .catch((error) => {
            throw error
        })
}
bootstrap()
