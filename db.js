
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashishm:Ashish123@cluster0.wcamm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function connectToCluster() {
    try {
        console.log('Connecting to MongoDB Atlas cluster...');
        await client.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return client;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

async function execute(fn, coll, arg) {
    let mongoClient;
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('test');
        const collection = db.collection(coll);
        return arg ? await fn(collection, arg) : await fn(collection);
    } finally {
        await mongoClient.close();
    }
}

async function save(collection, data) {
    try {
        let response = await collection.insertOne(data);
        return response;
    } catch (err) {
        return null;
    }
}

async function get(collection, arg) {
    try {
        let response = await collection.find(arg).toArray();
        return response;
    } catch (err) {
        return null;
    }
}

async function update(collection, {findArg, updatedFields}) {
    try {
        let response = await collection.updateMany(findArg, { $set: updatedFields });
        return response;
    } catch (err) {
        return null;
    }
}

// async getWalletById(collection, arg) {
//     try {
//         let response = await collection.find(arg).toArray();
//         return response;
//     } catch(error) {

//     }
// } 

module.exports = {
    execute,
    save,
    get,
    update
}
