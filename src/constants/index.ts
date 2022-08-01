import { IQuarter } from './interfaces/IQuarter.interface'
import { IOverDollar } from './interfaces/IOverDollar.interface'

export const QUARTERS: IQuarter = {
    1: ['01', '02', '03'],
    2: ['04', '05', '06'],
    3: ['07', '08', '09'],
    4: ['10', '11', '12'],
}

//  {overDollar: point}
export const OVERDOLLARSPENT: IOverDollar = {
    50: 1,
    100: 1,
}
