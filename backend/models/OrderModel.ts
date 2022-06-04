import { BaseModel } from "./BaseModel";

import { OrderType } from "../types/OrderType";

export class ProductModel extends BaseModel {
    async findAll(): Promise<OrderType[]> {
        await this._db.execute(`SELECT * FROM \`order\``);

        return this._db.results;
    }

    async findOne(id: number): Promise<OrderType> {
        await this._db.execute(`SELECT * FROM \`order\` WHERE \`id\` = ?`, id);

        return this._db.results[0];
    }

    async create(data: OrderType): Promise<number> {
        await this._db.execute(`INSERT INTO \`order\` SET \`user_id\` = ?, \`email\` = ?, \`phone\` = ?, \`firstname\` = ?, \`lastname\` = ?, \`created_at\` = ?`, [
            data.user_id,
            data.email,
            data.phone,
            data.firstname,
            data.lastname,
            data.created_at
        ]);

        const insertId = this._db.results.insertId;

        data.items.forEach(item => {
            this._db.execute(`INSERT INTO \`order_item\` SET \`order_id\` = ?, \`product_id\` = ?, \`name\` = ?, \`price\` = ?, \`quantity\` = ?`, 
                insertId,
                item.product_id,
                item.name,
                item.price,
                item.quantity
            )
        });

        return insertId;
    }

    async update(id: number, data: OrderType): Promise<number> {
        await this._db.execute(`UDPATE \`order\` SET \`user_id\` = ?, \`email\` = ?, \`phone\` = ?, \`firstname\` = ?, \`lastname\` = ?, \`updated_at\` = ?`, [
            data.user_id,
            data.email,
            data.phone,
            data.firstname,
            data.lastname,
            data.updated_at,
            id
        ]);

        const changedRows = this._db.results.changedRows;

        await this._db.execute(`DELETE FROM \`order_item\` WHERE \`order_id\` = ? `, id)

        data.items.forEach(item => {
            this._db.execute(`INSERT INTO \`order_item\` SET \`order_id\` = ?, \`product_id\` = ?, \`name\` = ?, \`price\` = ?, \`quantity\` = ?`, 
                id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
            )
        });

        return changedRows;
    }

    async destroy(id: number): Promise<number> {
        await this._db.execute(`DELETE FROM \`order\` WHERE \`id\` = ?`, id)

        return this._db.results.affectedRows;
    }

    async complete(id: number, data: OrderType): Promise<boolean> {
        await this._db.execute(`UPDATE \`order\` SET \`completed_at\` = ?  WHERE \`id\` = ?`, [
            data.completed_at,
            id
        ]);

        return this._db.results.changedRows;
    }
}