import { text, uuid } from "drizzle-orm/pg-core";

import { postgresTable } from "./_table";

export const users = postgresTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name"),
});
