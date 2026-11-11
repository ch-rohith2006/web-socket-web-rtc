import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

const { authRelations, ...tables } = schema;


export const relations = {
  ...defineRelations(schema),
  ...schema.authRelations,
};
