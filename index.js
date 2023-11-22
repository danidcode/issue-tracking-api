"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("@fastify/cors"));
const server = (0, fastify_1.default)();
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
server.register(require("fastify-auth0-verify"), {
    domain: process.env.AUTH0_DOMAIN,
    secret: process.env.AUTH0_CLIENT_SECRET,
});
server.register(cors_1.default, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
});
server.addHook("onRequest", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield request.jwtVerify();
    }
    catch (err) {
        reply.send(err);
    }
}));
server.get("/get-issues", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const issues = yield prisma.issue.findMany();
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(issues);
}));
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
