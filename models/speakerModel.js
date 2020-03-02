let mongoose=require("mongoose");
//schema
let speakerSchema=new mongoose.Schema({
    _id:Number,
    password:String,
    fullName:String,
    userName:String,
    age:Number,
    address:
    { 
            city: String,
            street:String,
            building:String       
    }
});

//mapping
mongoose.model("speakers",speakerSchema);