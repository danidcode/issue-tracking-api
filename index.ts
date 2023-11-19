import fastify from "fastify";
import dotenv from "dotenv";
import {FastifyRequest} from "fastify";
import {FastifyJWT} from "@fastify/jwt";

const server = fastify();
dotenv.config();

server.register(require("fastify-auth0-verify"), {
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_CLIENT_SECRET,
});

server.addHook(
  "onRequest",
  async (request: FastifyRequest<FastifyJWT>, reply) => {
    console.log("llega");
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);

server.get("/ping", async (request, reply) => {
  return "pong\n";
});
server.listen({port: 8080}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
