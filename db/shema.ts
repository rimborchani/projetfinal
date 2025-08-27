import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';

// lessons table: id, title, and 4 steps to construct a complete lesson
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  titre: text('titre').notNull(),
  concept: text('concept').default(''),
  preview: text('preview').default(''),
  step1: text('step1').notNull(),
  step2: text('step2').notNull(),
  step3: text('step3').notNull(),
  step4: text('step4').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
