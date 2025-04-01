import dbConnect from "../../lib/dbConnect";
import Location from "../../models/Location";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const locations = await Location.find();
      return res.status(200).json(locations);
    } catch (error) {
      console.error("GET Hatası:", error);
      return res
        .status(500)
        .json({ message: "Veri çekilemedi", error: error.message });
    }
  } else if (req.method === "POST") {
    upload.array("files")(req, res, async (err) => {
      if (err) {
        console.error("Dosya yükleme hatası:", err);
        return res.status(500).json({ message: "Dosya yükleme hatası" });
      }

      try {
        // api/location POST kısmı
        const newLocation = new Location({
          il: req.body.il,
          ilce: req.body.ilce,
          kategori: req.body.kategori, // 'mahalle' yerine 'kategori'
          baslik: req.body.baslik, // 'sokak' yerine 'baslik'
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          files: req.files.map((file) => ({
            data: file.buffer,
            contentType: file.mimetype,
          })),
          description: req.body.description,
        });
        await newLocation.save();
        return res.status(201).json({ message: "Veri kaydedildi!" });
      } catch (error) {
        console.error("POST Hatası:", error);
        return res
          .status(500)
          .json({ message: "Sunucu hatası!", error: error.message });
      }
    });
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const updatedData = req.body;

      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const data = JSON.parse(Buffer.concat(buffers).toString());
  
      const location = await Location.findByIdAndUpdate(
        id,
        data, // Güncellenmiş veriler
        { new: true, runValidators: true }
      );
  
      if (!location) {
        return res.status(404).json({ message: "Kayıt bulunamadı!" });
      }
  
      return res.status(200).json({ message: "Veri güncellendi!", location });
    } catch (error) {
      console.error("PUT Hatası:", error);
      return res
        .status(500)
        .json({ message: "Güncelleme hatası!", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    return res.status(405).json({ message: "Method not allowed" });
  }
}
