const {MongoClient} = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let dbInstance = null;
const dbName = 'Telaverge';

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }
  await client.connect();
  dbInstance = client.db(dbName);
  return dbInstance;
}

module.exports = connectToDatabase;
