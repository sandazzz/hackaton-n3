import mongoose from 'mongoose'; 

const TypeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    labo: {type: mongoose.Schema.Types.ObjectId, ref: 'Lab_Type'},
    },{
        timestamps: true 
    });

export const Type = mongoose.model('Type', TypeSchema);