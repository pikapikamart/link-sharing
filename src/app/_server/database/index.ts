import { drizzle } from "drizzle-orm/mysql2";
import mysql, { Connection } from "mysql2";
import * as schema from "./schema"


type MySQL = {
  conn: null | Connection,
  promise: null | Promise<Connection>
}

declare global {
  var mysql: MySQL;
}

let cached = global.mysql;

if (!cached) {
  cached = global.mysql = { conn: null, promise: null };
}

const createConnection = () =>{

  if (cached.conn) {
    return cached.conn;
  } else {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
    })

    cached.conn = connection

    return cached.conn
  }
}

export const db = drizzle(createConnection(), {
  schema: schema,
  mode: "default"
});