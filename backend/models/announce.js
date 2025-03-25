import mongoose from 'mongoose'; 

const AnnounceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description:  { type: String, required: true },
  price:     { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
},{
    timestamps: true 
  });

export const Announce = mongoose.model('Annonce', AnnounceSchema);