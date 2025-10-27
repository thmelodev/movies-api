import 'reflect-metadata';
import fastify from "fastify";
import { registerCoreModule } from "./modules/core/container";
import { registerSharedModule } from "./shared/container";
import { env } from './config/env';
import { registerLanguagesRoutes } from './modules/core/presentation/routes/Languages.routes';
import { registerMoviesRoutes } from './modules/core/presentation/routes/Movies.routes';
import { registerCategoriesRoutes } from './modules/core/presentation/routes/Categories.routes';

registerSharedModule()
registerCoreModule()

const app = fastify({logger: true})

app.register(async (instance) => {
  registerCategoriesRoutes(instance)
  registerLanguagesRoutes(instance)
  registerMoviesRoutes(instance)
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


