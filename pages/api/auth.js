import { connectToDatabase } from "../../lib/db";

const handleLogin = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const client = await connectToDatabase();
      const db = client.db(); // artık db() çağrısına gerek yok, client ile doğrudan erişim sağlanıyor.

      // Kullanıcıyı email'e göre sorgula
      const user = await db.collection("user").findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Kullanıcı bulunamadı!" });
      }

      // Düz metin şifreyi karşılaştır
      if (user.password === password) {
        // Şifre doğruysa giriş başarılı
        return res.status(200).json({ message: "Giriş başarılı!" });
      } else {
        // Şifre yanlışsa hata ver
        return res.status(401).json({ message: "Hatalı şifre!" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Bir hata oluştu!" });
    }
  } else {
    res.status(405).json({ message: "Metod desteklenmiyor" });
  }
};

export default handleLogin;
