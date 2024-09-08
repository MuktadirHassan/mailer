import { fastify } from "fastify";

const f = fastify({ logger: true });

f.get("/", async (request, reply) => {
  return { hello: "world" };
});

f.get("/ping", async (request, reply) => {
  return { ping: "pong" };
});

async function start() {
  try {
    const PORT = Number(process.env.PORT) || 5000;
    await f.listen({
      port: PORT,
    });
  } catch (err) {
    f.log.error(err);
    process.exit(1);
  }
}

start();
