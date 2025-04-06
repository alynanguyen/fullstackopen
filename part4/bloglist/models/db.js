const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://anhnguyen:anhnguyen123@cluster0.u7fcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let eventsCollection;

async function connectToDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");
    const database = client.db("eventsDB");
    eventsCollection = database.collection("events");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

function getEventsCollection() {
  if (!eventsCollection) {
    throw new Error("Database not initialized. Call connectToDB first.");
  }
  return eventsCollection;
}

module.exports = { connectToDB, getEventsCollection };
