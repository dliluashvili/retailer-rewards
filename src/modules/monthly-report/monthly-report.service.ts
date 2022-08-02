import {
    getQuarterByMonth,
    removeFieldFromArray,
} from '../../utils/get-quarter'
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
            .createQueryBuilder('monthly_report')
            .leftJoinAndSelect('monthly_report.user', 'user')
            .select([
                'user.id as user_id',
                'user.firstname as firstname',
                'user.lastname as lastname',
                'user.email as email',
                'monthly_report.quarter as quarter',
                'monthly_report.point as point',
            ])
            .where(filter)
            .getRawMany()
    }

    async quarters(filter: IFilterQuery = {}) {
        const { month } = filter

        if (month) {
            filter = removeFieldFromArray<IFilterQuery>(filter, 'month')
        }

        const query = this.monthlyReportRepo
            .createQueryBuilder('monthly_report')
            .leftJoinAndSelect('monthly_report.user', 'user')
            .select([
                'user.id as user_id',
                'user.firstname as firstname',
                'user.lastname as lastname',
                'user.email as email',
                'monthly_report.quarter as quarter',
                `date_part('month',date) as month`,
                'SUM(monthly_report.point) as point',
            ])
            .where(filter)
            .groupBy('user.id')
            .addGroupBy('month')
            .addGroupBy('quarter')

        if (month) {
            query.having(`date_part('month',date) = :month`, {
                month,
            })
        }

        query
            .orderBy('user.id', 'ASC')
            .addOrderBy('month', 'ASC')
            .addOrderBy('quarter', 'ASC')

        return query.getRawMany()
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
