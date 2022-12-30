
const MongoClient = require('mongodb').MongoClient;
let uri = 'mongodb://localhost:27017';
let dbname = 'test';

exports.dbConnect = async () => {
    return await MongoClient.connect(uri)
        .then(c => c.db(dbname))
        .catch((err) => console.log("B003", err))
}

exports.collectionConnect = async (collection) => {
    if (collection) {
        return await this.dbConnect().then(client => {
            return client.collection(collection)
        })
    }
}