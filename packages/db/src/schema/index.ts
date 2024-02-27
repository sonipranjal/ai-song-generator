import { text, timestamp, uuid } from "drizzle-orm/pg-core";

import { postgresTable } from "./_table";

export const users = postgresTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name"),
  email: text("email").notNull(),
});

export const voices = postgresTable("voices", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name"),
  thumbnailUrl: text("thumbnail_url"),
  modelUrl: text("model_url"),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
});

export const generatedSongs = postgresTable("generated_songs", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  voiceId: uuid("voice_id")
    .references(() => voices.id)
    .notNull(),
  audioUrl: text("audio_url"),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});
