import { db } from "../core/db";

export interface ModelInterface {
    findAll();
    findOne(id);
    create(data);
    update(id, data);
    destroy(id);
}

export class BaseModel implements ModelInterface {
    protected _db: any;

    constructor() {
        this._db = new db(
            process.env.DB_HOST, 
            parseInt(process.env.DB_PORT), 
            process.env.DB_USER, 
            process.env.DB_PASS, 
            process.env.DB_NAME
        );
    }

    findAll() {
        
    }
    
    findOne(id) {

    }

    create(data) {

    }

    update(id, data) {

    }

    destroy(id) {

    }
}