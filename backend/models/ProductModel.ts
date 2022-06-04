import { BaseModel } from "./BaseModel";

import { ProductType } from "../types/ProductType";

export class ProductModel extends BaseModel {
    async findAll(): Promise<ProductType[]> {
        const [rows, fields] = await this._db.execute(`SELECT * FROM \`product\``);
        return rows;
    }

    async findOne(id: number): Promise<ProductType> {
        const [rows, fields] = await this._db.execute(`SELECT * FROM \`product\` WHERE \`id\` = ?`, [id]);

        return rows;
    }

    async productByCategoryID(id): Promise<ProductType> {
        console.log(`SELECT * FROM \`product\` WHERE \`category_id\`=${id}`)
        const [rows] = await this._db.query(`SELECT * FROM \`product\` WHERE \`category_id\`=${id}`);
        return rows;
    }

    async create(data: ProductType): Promise<number> {
        const [rows, fields] = this._db.execute(`INSERT INTO \`product\` SET \`category_id\` = ?, \`name\` = ?, \`description\` = ?, \`price\` = ?, \`created_at\` = ?`, [
            data.category_id,
            data.name,
            data.description,
            data.price,
            data.created_at
        ]);

        return rows.insertId;
    }

    async update(id: number, data: ProductType): Promise<number> {
        const [rows, fields] = await this._db.execute(`UDPATE \`product\` SET \`category_id\` = ?, \`name\` = ?, \`description\` = ?, \`price\` = ?, \`updated_at\` = ? WHERE \`id\` = ?`, [
            data.category_id,
            data.name,
            data.description,
            data.price,
            data.updated_at,
            id
        ]);

        return this._db.results.changedRows;
    }

    async destroy(id: number): Promise<number> {
        const [rows, fields] = await this._db.execute(`DELETE FROM \`product\` WHERE \`id\` = ?`, [id]);

        return this._db.results.affectedRows;
    }

    async publish(id: number, data: ProductType): Promise<boolean> {
        await this._db.execute(`UPDATE \`product\` SET \`published_at\` = ?, \`updated_at\` = ?  WHERE \`id\` = ?`, [
            data.published_at,
            data.updated_at,
            id
        ]);

        return this._db.results.changedRows;
    }
}
