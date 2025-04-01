import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const FormData = mongoose.models.FormData || mongoose.model('FormData', formDataSchema);

export default FormData;
