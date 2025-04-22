// pages/api/users.js
import { connectToDatabase } from '../../lib/db';
import User from "../../models/User";

const handler = async (req, res) => {
  await connectToDatabase();

  if (req.method === 'GET') {
    const user = await User.find(); // Tüm kullanıcıları getir
    return res.status(200).json(user);
  }

  res.status(400).json({ message: 'Invalid request' });
};

export default handler;
