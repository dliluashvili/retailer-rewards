import { DataSource, DataSourceOptions } from 'typeorm'
import { defaultConfig } from '../config/typeorm.default.config'
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

const config = {
    ...defaultConfig(),
    migrations: ['dist/database/migrations/*.js'],
} as DataSourceOptions

export const AppDataSource = new DataSource(config)
