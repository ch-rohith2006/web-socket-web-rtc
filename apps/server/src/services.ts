import { createAuth } from "@web-socket-web-rtc/auth";
import { createDb } from "@web-socket-web-rtc/db";

import { ENV } from "./env.server";

export const db = createDb(ENV);
export const auth = createAuth(ENV, db);
