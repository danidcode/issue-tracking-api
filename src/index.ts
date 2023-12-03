import cors from "@fastify/cors";
import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";
import fastify, {FastifyRequest} from "fastify";

import issuesRoutes from "./routes/issues";
import {FastifyJWT} from "@fastify/jwt";
import fastifyAuth0Verify from "fastify-auth0-verify";

const server = fastify();
dotenv.config();
const prisma = new PrismaClient();

server.register(fastifyAuth0Verify, {
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_CLIENT_SECRET,
});

server.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false,
});

server.addHook(
  "onRequest",
  async (request: FastifyRequest<FastifyJWT>, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);

server.listen({port: 8080}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.register(issuesRoutes, {prefix: "/issues"});
