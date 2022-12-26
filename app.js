import fastify from 'fastify';
import mongodb from 'mongodb';
import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';
import { nanoid } from 'nanoid';
const MongoClient = mongodb.MongoClient;

const main = async () => {
    try {
        let app = fastify({ logger: false })
        let uri = 'mongodb://localhost:27017';
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        let db = null;
        client.connect()
            .then(() => {
                db = client.db('test');
            })
            .catch((err) => console.log("B003", err));

        app.register(fastifyPlugin(async (fastify) => {
            let mongo = await MongoClient.connect(uri, {
                useUnifiedTopology: true,
            });
            let db = mongo.db('test');
            fastify.decorate('db', db);
        }));

        app.register(fastifyCors, {
            origin: true,
            methods: 'GET,PUT,POST,PATCH,DELETE',
            preflight: true,
        });

        app.addHook('preHandler', async (req) => {
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

        app.addHook('preSerialization', async (req, res, payload) => {
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

        app.get("/api/users", async (req, res) => {
            const users = db.collection("users");
            console.log("/api/users adresine GET ALL işlemi yapıldı..")
            let result = users.find({}).toArray()
            return result;
        })

        app.get("/api/users/:id", async (req, res) => {
            const users = db.collection("users");
            console.log("/api/users adresine GET işlemi yapıldı..")
            let result = users.findOne({ _id: req.params.id });
            if (result) return result;
            return false;
        })

        app.post("/api/users", async (req, res) => {
            const users = db.collection("users");
            console.log("/api/users adresine POST işlemi yapıldı..")
            let data = {
                ...req.body,
                _id: nanoid(),
                createdAt: new Date(),
                createdBy: "1"
            }
            let result = await users.insertOne(data)
            if (result.insertedId) return users.findOne({ _id: result.insertedId });
            return false;
        })

        app.put("/api/users/:id", async (req, res) => {
            const users = db.collection("users");
            console.log("/api/users adresine UPDATE işlemi yapıldı..")
            let data = {
                ...req.body,
                updatedAt: new Date(),
                updatedBy: "1"
            }
            const result = await users.updateOne(
                { _id: req.params.id },
                { $set: data }
            );
            console.log(result)
            if (result.matchedCount > 0) return users.findOne({ _id: req.params.id });
            return false;
        })

        app.delete("/api/users/:id", async (req, res) => {
            const users = db.collection("users");
            console.log("/api/users adresine DELETE işlemi yapıldı..")
            const result = await users.deleteOne({ _id: req.params.id });
            if (result.deletedCount > 0) return true;
            return false;
        })

        await app.listen({
            port: 3000,
            host: "0.0.0.0"
        })
    } catch (error) {
        console.log("B001", error)
    }
}

main();