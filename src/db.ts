import { MongoClient } from 'mongodb';

if (!process.env.DB_URL) {
  throw new Error('Missing DB_URL in .env');
}
if (!process.env.DB_NAME) {
  throw new Error('Missing DB_NAME in .env');
}

console.log(`THE MONGODB URL : ${process.env.DB_URL}`);

const client = new MongoClient(process.env.DB_URL);
client.connect();
export default client.db(process.env.DB_NAME);
