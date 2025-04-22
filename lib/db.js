// lib/db.js
import { MongoClient } from 'mongodb';

let cachedClient = null;

export const connectToDatabase = async () => {
  if (cachedClient) return cachedClient;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("MongoDB'ye bağlanıldı!");
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("MongoDB bağlantı hatası: ", error);
    throw new Error("Veritabanı bağlantısı başarısız!");
  }
};
