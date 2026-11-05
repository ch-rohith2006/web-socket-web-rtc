import type { Session } from "@web-socket-web-rtc/auth";
import type { Database } from "@web-socket-web-rtc/db";

export type Context = {
  session: Session | null;
  db: Database;
};
