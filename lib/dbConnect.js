import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // MongoDB bağlantı URL'si

if (!MONGODB_URI) {
  throw new Error("Lütfen MongoDB bağlantı URL'sini .env dosyasında tanımlayın.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Burada doğru bir şekilde default export kullanıyoruz.
export default dbConnect;
