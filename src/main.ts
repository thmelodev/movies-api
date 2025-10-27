import 'reflect-metadata';
import fastify from "fastify";
import { registerCoreModule } from "./modules/core/container";
import { registerSharedModule } from "./shared/container";
import { registerCategoriesRoutes } from "./modules/core/presentation/routes/categories.routes";
import { env } from './config/env';

registerSharedModule()
registerCoreModule()

const app = fastify({logger: true})

app.register(async (instance) => {
  registerCategoriesRoutes(instance)
})

const start = async () => {
  try {
    await app.listen({ port: env.PORT || 3001, host: '127.0.0.1' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start()


