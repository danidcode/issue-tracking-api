import fastify from "fastify";
import dotenv from "dotenv";
import {FastifyRequest} from "fastify";
import {FastifyJWT} from "@fastify/jwt";
import {PrismaClient} from "@prisma/client";
import cors from "@fastify/cors";

const server = fastify();
dotenv.config();
const prisma = new PrismaClient();

server.register(require("fastify-auth0-verify"), {
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

server.get("/get-issues", async (request: FastifyRequest, reply) => {
  const issues = await prisma.issue.findMany();

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(issues);
});
server.listen({port: 8080}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
