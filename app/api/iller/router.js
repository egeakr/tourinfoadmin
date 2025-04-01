import connectDB from "@/lib/dbConnect";  // MongoDB'ye bağlanma fonksiyonu
import Location from "@/models/Location";  // Location modelini al (MongoDB modelini tanımladığınız dosya)

export default async function handler(req, res) {
  try {
    // MongoDB'ye bağlan
    await connectDB();
    
    // Veritabanından tüm location verilerini al
    const locations = await Location.find(); 

    // JSON formatında veriyi geri döndür
    res.status(200).json(locations); 
  } catch (error) {
    res.status(500).json({ message: "Veri çekilemedi", error: error.message });
  }
}
