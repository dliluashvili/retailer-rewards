import { IUser } from './user.interface'
import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({
    name: 'users',
})
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({
        unique: true,
    })
    email: string

    @Column({
        default: 0,
    })
    point: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
