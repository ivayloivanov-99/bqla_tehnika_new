import { BaseModel } from "./BaseModel";

import { UserType } from "../types/UserType";

export class UserModel extends BaseModel {
    async login(user: UserType): Promise<UserType> {
        await this._db.execute(`SELECT * FROM \`user\` WHERE \`email\` = ? AND \`password\` = ?`, [
            user.email,
            user.password
        ]);

        return this._db.results[0];
    }

    async register(user: UserType): Promise<number> {
        return await this.create(user);
    }

    async findAll(): Promise<UserType[]> {
        const [rows, fields] = await this._db.execute(`SELECT * FROM \`user\``);

        return rows;
    }

    async findOne(id: number): Promise<UserType> {
        await this._db.execute(`SELECT * FROM \`user\` WHERE \`id\` = ?`, id);

        return this._db.results[0];
    }

    async create(data: UserType): Promise<number> {
        await this._db.execute(`INSERT INTO \`user\` SET \`role\` = ?, \`email\` = ?, \`phone\` = ?, \`password\` = ?, \`firstname\` = ?, \`lastname\` = ?, \`created_at\` = ?`, [
            data.role,
            data.email,
            data.phone,
            data.password,
            data.firstname,
            data.lastname,
            data.created_at
        ]);

        return this._db.results.insertId;
    }

    async update(id: number, data: UserType): Promise<number> {
        await this._db.execute(`UDPATE \`user\` SET \`role\` = ?, \`email\` = ?, \`phone\` = ?, \`password\` = ?, \`firstname\` = ?, \`lastname\` = ?, \`updated_at\` = ? WHERE \`id\` = ?`, [
            data.role,
            data.email,
            data.phone,
            data.password,
            data.firstname,
            data.lastname,
            data.updated_at,
            id
        ]);

        return this._db.results.changedRows;
    }

    async destroy(id: number): Promise<number> {
        await this._db.execute(`DELETE FROM \`user\` WHERE \`id\` = ?`, id)

        return this._db.results.affectedRows;
    }
}