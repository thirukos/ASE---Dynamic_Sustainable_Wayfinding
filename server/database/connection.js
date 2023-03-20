import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'

async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    
    mongoose.set('strictQuery', true);
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connected");

    // Code fragment 2
    const someData = {name: 'John Doe', age: 30};
    const collection = db.collection('myCollection');
    await collection.insertOne(someData);

    return db;
}

export default connect;
