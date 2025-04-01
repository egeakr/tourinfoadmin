// models/Location.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  il: { type: String, required: true },
  ilce: { type: String, required: true },
  kategori: { type: String, required: true },
  baslik: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  files: [{
    data: Buffer,
    contentType: String,
  }],
  description: { type: String, required: false },
}, { 
  collection: "locations", // Koleksiyon adını belirt
  db: "tourinfo" // Veritabanı adını belirt
});

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);
export default Location;
