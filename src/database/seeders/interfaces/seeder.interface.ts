export interface ISeeder<T> {
    create: () => Promise<string>
    generate?: (params: Partial<T>) => Promise<T> | T
}
