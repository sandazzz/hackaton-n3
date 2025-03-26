import mongoose from 'mongoose'; 

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  phone_number: { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  labo: {}
},{
    timestamps: true 
  });

export const User = mongoose.model('User', UserSchema);