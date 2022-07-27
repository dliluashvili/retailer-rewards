import { IUser } from '../user.interface'

export class CreateUserDto implements IUser {
    firstname: string

    lastname: string

    email: string
}
