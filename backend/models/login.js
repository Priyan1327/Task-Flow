import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({

     username : {type : String , required : true , unique : true },

     email : {type : String , required : true , unique : true },

     password : {type : String , required : true },

     role : { type : String, enum: ["TL", "Member"] }

}, {
     timestamps : true
}) 

const Login = mongoose.model("Login", loginSchema);

export default Login;