import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";


const connection = mysql.createConnection({
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT as unknown as number,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string
});

const db = drizzle(connection);