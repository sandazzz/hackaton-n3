import mongoose from 'mongoose'; 

const ReservationSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date_start: {type: String, required: true},
    date_end: {type: Number, required: true},
    announce: {type: mongoose.Schema.Types.ObjectId, ref: 'Announce_Reservation', required: true },
    },{
        timestamps: true 
    });

export const Reservation = mongoose.model('Reservation', ReservationSchema);