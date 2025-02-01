import mongoose  from "mongoose";

export function register(){
  if(mongoose.connections.length){
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Db");
  }
}