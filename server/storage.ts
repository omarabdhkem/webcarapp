import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a Drizzle database instance
export const db = drizzle(pool, { schema });

// Storage interface
export interface IStorage {
  // User operations
  getUsers(): Promise<schema.User[]>;
  getUserById(id: number): Promise<schema.User | null>;
  createUser(user: schema.InsertUser): Promise<schema.User>;
}

// Implementation
export class PostgresStorage implements IStorage {
  async getUsers(): Promise<schema.User[]> {
    return await db.select().from(schema.users);
  }

  async getUserById(id: number): Promise<schema.User | null> {
    const results = await db.select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    return results[0] || null;
  }

  async createUser(user: schema.InsertUser): Promise<schema.User> {
    const [newUser] = await db.insert(schema.users)
      .values(user)
      .returning();
    return newUser;
  }
}
