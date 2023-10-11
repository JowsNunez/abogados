import { Model } from 'sequelize-typescript'

export interface BaseDao<T> {
    create(data: T): Promise<T>
    findById(id: number): Promise<T>
    findAll(): Promise<T[]>
    update(id: number, data: T): Promise<T>
    delete(id: number): Promise<boolean>
}