const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const uri = "your_mongodb_connection_string";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to database");
        const db = client.db("your_database_name");
        // Access collections
        const users = db.collection("users");
        const profiles = db.collection("profiles");
        const jobs = db.collection("jobs");
        const applications = db.collection("applications");
        const logs = db.collection("logs");
        const settings = db.collection("settings");
        
        // You can now perform operations on the collections
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

connectToDatabase();
