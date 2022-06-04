import { BaseModel } from "./BaseModel";

import { CategoryType } from "../types/CategoryType";

export class CategoryModel extends BaseModel {
    async findAll(): Promise<CategoryType[]> {
        await this._db.execute(`SELECT * FROM \`category\``);

        return this._db.results;
    }


    async findOne(id: number): Promise<CategoryType> {
        await this._db.execute(`SELECT * FROM \`category\` WHERE \`id\` = ?`, id);

        return this._db.results[0];
    }

    async create(data: CategoryType): Promise<number> {
        await this._db.execute(`INSERT INTO \`category\` SET \`name\` = ?, \`description\` = ?, \`created_at\` = ?`, [
            data.name,
            data.description,
            data.created_at
        ]);

        return this._db.results.insertId;
    }

    async update(id: number, data: CategoryType): Promise<number> {
        await this._db.execute(`UDPATE \`category\` SET \`name\` = ?, \`description\` = ?, \`updated_at\` = ? WHERE \`id\` = ?`, [
            data.name,
            data.description,
            data.updated_at,
            id
        ]);

        return this._db.results.changedRows;
    }

    async destroy(id: number): Promise<number> {
        await this._db.execute(`DELETE FROM \`category\` WHERE \`id\` = ?`, id);

        return this._db.results.affectedRows;
    }

    async publish(id: number, data: CategoryType): Promise<boolean> {
        await this._db.execute(`UPDATE \`category\` SET \`updated_at\` = ?  WHERE \`id\` = ?`, [
            data.published_at,
            id
        ]);

        return this._db.results.changedRows;
    }
}
