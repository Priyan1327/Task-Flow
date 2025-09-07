import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({

     title : { type : String , required : true },

     description : { type : String , required : true },

     catogery : {type : String , required : true }, 

},
   {
     timestamps : true
})

const Taks = mongoose.model("Task", taskSchema);

export default Taks;