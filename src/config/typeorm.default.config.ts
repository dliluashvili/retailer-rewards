import { ConfigService } from '@nestjs/config'

export const defaultConfig = (config: ConfigService = null) => {
    return {
        name: 'default',
        type: 'postgres',
        host:
            config instanceof ConfigService
                ? config.get('POSTGRES_HOST')
                : process.env.POSTGRES_HOST,
        port:
            config instanceof ConfigService
                ? config.get('POSTGRES_PORT')
                : process.env.POSTGRES_PORT,
        username:
            config instanceof ConfigService
                ? config.get('POSTGRES_USER')
                : process.env.POSTGRES_USER,
        password:
            config instanceof ConfigService
                ? config.get('POSTGRES_PASSWORD')
                : process.env.POSTGRES_PASSWORD,
        database:
            config instanceof ConfigService
                ? config.get('POSTGRES_DATABASE')
                : process.env.POSTGRES_DATABASE,
        entities: ['dist/modules/**/*.entity.js'],
    }
}
