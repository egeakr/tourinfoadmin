import dbConnect from "@/lib/dbConnect";  // dbConnect fonksiyonunu doğru bir şekilde import et
import Location from "@/models/Location";  // Location modelini import et

export default async function handler(req, res) {
  try {
    await dbConnect(); // MongoDB'ye bağlan
    const locations = await Location.find(); // Veritabanındaki tüm location verilerini al
    res.status(200).json(locations); // Veriyi döndür
  } catch (error) {
    res.status(500).json({ message: "Veri çekilemedi", error: error.message });
  }
}
