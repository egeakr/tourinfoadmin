// pages/api/login.js
import bcrypt from "bcryptjs";  // Bcrypt'i import et
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();  // MongoDB'ye bağlan

    const { email, password } = req.body;  // Girişteki email ve şifreyi al

    try {
      // Veritabanında email'i bul
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: "Email veya şifre hatalı!" });
      }

      // Şifreyi karşılaştır
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Email veya şifre hatalı!" });
      }

      // Giriş başarılıysa token oluştur (isteğe bağlı)
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // 1 saat geçerli
      });

      res.status(200).json({ message: "Giriş başarılı!", token });
    } catch (error) {
      res.status(500).json({ message: "Bir hata oluştu." });
    }
  } else {
    res.status(405).json({ message: "Yalnızca POST isteği kabul edilir." });
  }
}
