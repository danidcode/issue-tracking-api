import {PrismaClient} from "@prisma/client";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";

const prisma = new PrismaClient();

export const getIssues = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const issues = await prisma.issue.findMany();

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(issues);
};

export const getIssue = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const id = 1;
  const issues = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(issues);
};
