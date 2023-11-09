const mongoose = require('mongoose');
const MONGO_DB_URL = process.env.MONGO_DB_URL

const dbConnect= async (req,res)=>{
    try{
        await mongoose.connect(`${MONGO_DB_URL}`)
        .then(()=>console.log('connected to mongodb'))
    }
    catch(err){
        console.log({message:err})
    }
}

dbConnect();