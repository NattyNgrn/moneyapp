import pg from 'pg';
import { config } from 'dotenv';

config();

export const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URL,
});

export function getAmountsForTagsQueries(goalTagRows, clerkid) {
    const result = [];
    for (let i = 0; i < goalTagRows.length; i++) {
        result.push(`SELECT SUM(amount) FROM transactions WHERE tagname='${goalTagRows[i].tagname}' AND clerkid='${clerkid}'`);
    }
    return result;
}
