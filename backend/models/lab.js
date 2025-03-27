import mongoose from 'mongoose'; 

const LabSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: {type: String, required: true},
    price: {type: Number, required: true},
    location: {type: String, required: true },
    mobile: {type: Boolean, required:true},
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Lab_Type', required: true}
    },{
        timestamps: true 
    });

export const Lab = mongoose.model('Lab', LabSchema);