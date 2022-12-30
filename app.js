const fastify = require('fastify')({ logger: true });
const fastifyPlugin = require('fastify-plugin');
const fastifyCors = require('@fastify/cors');
const { routes } = require('./routes/index');
// const { options } = require('./config/swagger');
const { dbConnect } = require('./config/database');

const main = async () => {
    try {
        // configure to swagger with fastify in nodejs?
        // exports.options = {
        //     swagger: "2.0",
        //     info: {
        //         title: 'Fastify API',
        //         description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
        //         version: '1.0.0'
        //     },
        //     externalDocs: {
        //         url: 'https://swagger.io',
        //         description: 'Find more info here'
        //     },
        //     host: 'localhost',
        //     schemes: ['http'],
        //     consumes: ['application/json'],
        //     produces: ['application/json']
        // }

        await fastify.register(require('@fastify/swagger'), {
            swagger: {
                info: {
                    title: 'Fastify API',
                    description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
                    version: '2.0.0'
                },
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Find more info here'
                },
                host: 'localhost',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json']
            }
        });

        await fastify.register(require('@fastify/swagger-ui'), {
            routePrefix: '/swagger',
            uiConfig: {
                docExpansion: 'full',
                deepLinking: false
            },
            uiHooks: {
                onRequest: function (request, reply, next) { next() },
                preHandler: function (request, reply, next) { next() }
            },
            staticCSP: true,
            transformStaticCSP: (header) => header,
            transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
            transformSpecificationClone: true
        });

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
                // if (!req.url.startsWith('/api')) throw Error('Forbidden');

                if (req.url.startsWith('/documentation')) return;
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

        fastify.ready();
        await fastify.listen({
            port: 3000,
            host: "0.0.0.0"
        })
        fastify.swagger()
    } catch (error) {
        console.log("B001", error)
    }
}

main();