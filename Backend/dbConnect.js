const mongoose= require('mongoose');
const monogoURI= "mongodb://localhost:27017/inotebook";

//Function to connect with the Database
const connectToMongo=()=>{
    mongoose.connect(monogoURI,()=>{
        console.log('connected to mongo successfully')
    })
}

module.exports=connectToMongo;