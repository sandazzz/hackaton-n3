import mongoose from 'mongoose'; 

const Announce_ReservationSchema = new mongoose.Schema({
    announce: {type: mongoose.Schema.Types.ObjectId, ref: 'Annonce', required: true },
    reservation: {type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true},
    });

export const Announce_Reservation = mongoose.model('Announce_Reservation', Announce_ReservationSchema);