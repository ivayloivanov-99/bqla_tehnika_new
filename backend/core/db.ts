import { application } from "express";

const mysql = require("mysql2");

//създавам клас в който има една публична променлива, която служи за връзка към базата данни
export class db {
    private promisePool;
    
    public results;
    public fields;

    constructor(host: string, port: number, user: string, password: string, database: string) {
        const pool = mysql.createPool({
            host: host,
            port: port, 
            user: user,
            password: password,
            database: database
        })
        
        this.promisePool = pool.promise();
    }

    async query(query: string) {

        const [rows, fields] = await this.promisePool.query(query, function(error, rows, fields) {
            if (error) throw error;
        });

        return [rows, fields];
    }

    async execute(query: string, data: any) {

        const [rows, fields] = await this.promisePool.execute(query, data, function(error, rows, fields) {
            if (error) throw error;
        });

        return [rows, fields];
    }
}