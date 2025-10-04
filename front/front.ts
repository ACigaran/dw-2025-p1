import Fastify from "fastify";
import path, { dirname, join } from "path";
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
root: path.join(__dirname, 'public'),
prefix: '/'
});

const port: number = parseInt(process.env.FASTIFY_PORT || "3000");
const host: string = "::";

const rootDir = dirname(process.argv[1]);

try {
  await fastify.listen({ host, port });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
