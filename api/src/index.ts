import { fastify } from "fastify";
import { render } from "@react-email/render";
import VercelInviteUserEmail from "../emails/vercel-invite-user";
const PORT = Number(process.env.PORT) || 5000;
const ENV: "development" | "production" =
  (process.env.NODE_ENV as any) || "development";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
} as const;

const f = fastify({
  logger: envToLogger[ENV],
});

f.get("/health", async (request, reply) => {
  return "OK";
});

/**
* API features
(Public)
1. Send a new email - app id, template id, email list[]

(Private)
1. Create/Register a new application - app id, app name, app domain,
2. Create/Register a new template - template name (exact), app idd

2. Get all applications
3. Get all templates

*/

f.get("/send-email", async (request, reply) => {
  const html = await render(VercelInviteUserEmail({}));

  return html;
});

async function start() {
  try {
    await f.listen({
      port: PORT,
    });
  } catch (err) {
    f.log.error(err);
    process.exit(1);
  }
}

start();
