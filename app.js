const fastify = require('fastify')({ logger: true });
const fastifyPlugin = require('fastify-plugin');
const fastifyCors = require('@fastify/cors');
const { routes } = require('./routes/index');
// const { options } = require('./config/swagger');
const { dbConnect } = require('./config/database');

const main = async () => {
    try {
        dbConnect();

        // fastify.register(require('@fastify/swagger'), options)

        fastify.register(fastifyPlugin(async (fastify) => {
            routes.forEach((route, index) => {
                fastify.route(route)
            })

        }));

        fastify.register(fastifyCors, {
            origin: true,
            methods: 'GET,PUT,POST,PATCH,DELETE',
            preflight: true,
        });

        fastify.addHook('preHandler', async (req) => {
            try {
                console.log("preHandler")
                if (!req.url.startsWith('/api')) throw Error('Forbidden');

                // if (req.url.startsWith('/api/users')) return;
                // if (req.url.startsWith('/api/users/:id')) return;

            } catch (error) {
                console.log("B002 >>", error)
                throw error;
            }
        })

        fastify.addHook('preSerialization', async (req, res, payload) => {
            if (payload && payload.result_message) {
                return payload;
            } else {
                return {
                    result: payload,
                    result_message: {
                        type: 'success',
                        title: 'Info',
                        message: 'Success',
                    }
                };
            }
        });

        // fastify.ready();
        await fastify.listen({
            port: 3000,
            host: "0.0.0.0"
        })
        // fastify.swagger();
    } catch (error) {
        console.log("B001", error)
    }
}

main();