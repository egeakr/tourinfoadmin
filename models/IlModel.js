import mongoose from "mongoose";

const IlSchema = new mongoose.Schema({
  il_adi: {
    type: String,
    required: true,
  },
  // Diğer alanlar burada tanımlanabilir
});

const IlModel = mongoose.models.Il || mongoose.model("Il", IlSchema);

export default IlModel;
