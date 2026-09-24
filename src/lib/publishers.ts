/**
 * Data access helpers for publisher records.
 *
 * This module exposes lightweight queries used by build-time page data to read
 * publisher metadata from the local SQLite database.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves all publishers sorted alphabetically by name.
 *
 * @param db - Injectable database client used to query the publisher table.
 * @returns A list of publishers ordered by display name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
