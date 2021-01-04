

export class User {
    constructor(public _id?: string, public username: string = '', public role: string = 'User', public coins: number = 100, public moves = []) {}
}