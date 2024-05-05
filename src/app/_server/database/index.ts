import { drizzle } from "drizzle-orm/mysql2";
import mysql, {  Pool } from "mysql2";
import * as schema from "./schema"


type MySQL = {
  conn: null | Pool,
  promise: null | Promise<Pool>
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

    const connection = mysql.createPool({
      uri: process.env.NODE_ENV==="development"? process.env.DB_URI : process.env.DB_URI_PROD
    })

    cached.conn = connection

    return cached.conn
  }
}

export const db = drizzle(createConnection(), {
  schema: schema,
  mode: "default"
});