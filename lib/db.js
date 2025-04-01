const { MongoClient } = require('mongodb');

export const connectToDatabase = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("MongoDB'ye bağlanıldı!");
    return client; // Burada client nesnesi döndürülüyor.
  } catch (error) {
    console.error("MongoDB bağlantı hatası: ", error);
    throw new Error("Veritabanı bağlantısı başarısız!");
  }
};

// `client.db()`'i şu şekilde değiştirebilirsin:
const handleLogin = async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(); // client'dan veritabanını almak için doğru kullanım
    const user = await db.collection("user").findOne({ email });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hata oluştu!" });
  }
};
