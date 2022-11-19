const mongoose = require('mongoose');
const { Schema } = mongoose;

//Defing the schema for the Notes
const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'general'
    },
    date:{
        type:String,
        default:Date.now
    },
  });

  module.exports=mongoose.model('note',NotesSchema)