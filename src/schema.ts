import { z } from 'zod';

const entryTypeEnum = z.enum(['DID', 'WILL', 'ACHIEVE', 'REGRET']);

export const entriesSchema = z.object({
  type: entryTypeEnum,
  entry: z.string(),
});

export const journalSchema = z.object({
  entries: z.array(entriesSchema).optional(),
});
