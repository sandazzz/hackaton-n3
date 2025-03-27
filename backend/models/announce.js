import mongoose from 'mongoose'; 

const AnnounceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, required: true},
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  labo: {type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true},
  reservation: {type: mongoose.Schema.Types.ObjectId, ref: 'Announce_Reservation', required: true}
},{
    timestamps: true 
  });

export const Announce = mongoose.model('Announce', AnnounceSchema);