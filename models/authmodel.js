let mongoose=require("mongoose");
//schema
let loginSchema=new mongoose.Schema({
    password:String,
    name:String
    
});

//mapping
//mongoose.model("speakers",loginSchema);