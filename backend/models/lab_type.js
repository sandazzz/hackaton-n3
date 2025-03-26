import mongoose from 'mongoose'; 

const Lab_TypeSchema = new mongoose.Schema({
    labo: {type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    });

export const Lab_Type = mongoose.model('Lab_Type', Lab_TypeSchema);