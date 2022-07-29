import { getQuarterByMonth } from 'src/utils/get-quarter'
import { CreateMonthlyReportDto } from './dtos/create-monthly-report.dto'
import { MonthlyReport } from './monthly-report.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import * as moment from 'moment'
import { IFilterQuery } from './filter-query.interface'

@Injectable()
export class MonthlyReportService {
    constructor(
        @InjectRepository(MonthlyReport)
        private readonly monthlyReportRepo: Repository<MonthlyReport>
    ) {}

    async find(
        filter: FindManyOptions<MonthlyReport> = {}
    ): Promise<MonthlyReport[]> {
        return this.monthlyReportRepo
            .query(`select u.id as user_id, u.firstname, u.lastname, u.email, quarter,monthly_report.point
            from monthly_report left join users u on u.id = monthly_report.user_id`)
    }

    async quarters(filter: IFilterQuery = {}) {
        const params = []

        let query = `select u.id as user_id, u.firstname, u.lastname, u.email, quarter, date_part('month',date) as month, SUM(monthly_report.point) as point 
        from monthly_report left join users u on u.id = monthly_report.user_id`

        let paramsIndex = 0

        Object.keys(filter).map((key) => {
            const value = filter[key]
            if (key !== 'month') {
                paramsIndex++
                query += ` ${
                    paramsIndex > 1 ? 'and' : 'where'
                } ${key}=$${paramsIndex}`
                params.push(value)
            }
        })

        query += ` group by u.id, month, quarter`

        if (filter.month) {
            query += ` HAVING date_part('month',date)=$${++paramsIndex}`
            params.push(filter.month)
        }

        query += ` ORDER BY user_id, month, quarter;`

        return this.monthlyReportRepo.query(query, params)
    }

    async create(
        createMonthlyReportDto: CreateMonthlyReportDto
    ): Promise<MonthlyReport> {
        const month = moment(createMonthlyReportDto.date, 'YYYY-MM-DD').format(
            'M'
        )

        const quarter = getQuarterByMonth(month)

        const report = this.monthlyReportRepo.create({
            quarter,
            ...createMonthlyReportDto,
        })

        return this.monthlyReportRepo.save(report)
    }
}
