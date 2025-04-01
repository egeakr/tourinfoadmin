import connectDb from '../../lib/mongodb';
import FormData from '../../models/FormData';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDb();

    try {
      const { name, email, message } = req.body;

      // Veriyi MongoDB'ye kaydet
      const formData = new FormData({
        name,
        email,
        message,
      });

      await formData.save();
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Veri kaydedilemedi.' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Yalnızca POST istekleri kabul edilir.' });
  }
}
