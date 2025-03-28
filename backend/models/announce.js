import mongoose from 'mongoose'; 

const AnnounceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, required: true},
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  labo: {type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true},
  type: {type: String, required: true},
  reservation: {type: mongoose.Schema.Types.ObjectId, ref: 'Announce_Reservation'}
},{
    timestamps: true 
});

const Announce = mongoose.model('Announce', AnnounceSchema);

export default Announce