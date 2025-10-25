import { defineConfig } from "prisma/config";
import { env } from "./src/config/env";

export default defineConfig({
  schema: "./src/shared/infra/prisma/schema.prisma",
  migrations: {
    path: "./src/shared/infra/prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env.DATABASE_URL,
  },
});
