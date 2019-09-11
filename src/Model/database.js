import dotenv from 'dotenv'; 
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

export default pool;
