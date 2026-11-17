
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { appRouter } from "@web-socket-web-rtc/api/routers/index";
import { user } from "@web-socket-web-rtc/db/schema/auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { connectRedis } from "./redis";
import { createContext } from "./context";
import { ENV } from "./env.server";
import { auth, db } from "./services";

const app = new Hono();

app.use(logger());

app.use(
  "/*",
  cors({
    origin: ENV.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Better Auth routes
app.on(["POST", "GET"], "/api/auth/*", async (c) =>
  auth.handler(c.req.raw)
);

// Assign student or teacher role after signup
app.post("/api/account/role", async (c) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ error: "Please log in first." }, 401);
    }

    const body = await c.req.json<{
      role?: string;
    }>();

    if (
      body.role !== "student" &&
      body.role !== "teacher"
    ) {
      return c.json({ error: "Invalid account type." }, 400);
    }

    const updatedUsers = await db
      .update(user)
      .set({
        role: body.role,
        teacherStatus:
          body.role === "teacher"
            ? "registered"
            : "not_applicable",
      })
      .where(eq(user.id, session.user.id))
      .returning({
        id: user.id,
      });

    if (updatedUsers.length === 0) {
      return c.json(
        { error: "Unable to assign account role." },
        400
      );
    }

    return c.json({
      success: true,
      role: body.role,
    });
  } catch (error) {
    console.error("Role assignment failed:", error);

    return c.json(
      { error: "Unable to save account type." },
      500
    );
  }
});

// OpenAPI handler
export const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

// RPC handler
export const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

// RPC and OpenAPI middleware
app.use("/*", async (c, next) => {
  const context = await createContext({ context: c });

  const rpcResult = await rpcHandler.handle(c.req.raw, {
    prefix: "/rpc",
    context,
  });

  if (rpcResult.matched) {
    return c.newResponse(
      rpcResult.response.body,
      rpcResult.response
    );
  }

  const apiResult = await apiHandler.handle(c.req.raw, {
    prefix: "/api-reference",
    context,
  });

  if (apiResult.matched) {
    return c.newResponse(
      apiResult.response.body,
      apiResult.response
    );
  }

  await next();
});

app.get("/", (c) => {
  return c.text("OK");
});

// Connect Redis before exporting the application
await connectRedis();

export default app;
