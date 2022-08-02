import { QUARTERS } from '../../constants'

export const getQuarterByMonth = (_month: string | number): number => {
    let month = typeof _month === 'string' ? _month : _month.toString()

    if (month.length === 1) {
        month = `0${month}`
    }

    if (parseInt(month) > 12 || parseInt(month) < 0) {
        return
    }

    let quarter: number

    Object.keys(QUARTERS).map((_quarter) => {
        const months = QUARTERS[_quarter]
        if (months.includes(month)) {
            quarter = parseInt(_quarter)
            return
        }
    })

    return quarter
}

export const removeFieldFromArray = <T>(
    filter: T,
    field: string
): Partial<T> => {
    return Object.keys(filter)
        .filter((key) => key !== field)
        .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: filter[key],
            })
        }, {})
}
