import {FastifyInstance} from "fastify";
import {getIssue, getIssues} from "../controllers/issueController";

const issuesRoutes = async (server: FastifyInstance) => {
  server.get("/", getIssues);
  server.get("/{id}", getIssue);
};

export default issuesRoutes;
