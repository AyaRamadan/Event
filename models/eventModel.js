let mongoose=require("mongoose");
//schema
let eventSchema=new mongoose.Schema({
    _id:Number,
    title:String,
    eventDate:Date,
    mainSpeaker:{type:Number ,ref:"speakers"},
    otherSpeaker:[{type:Number ,ref:"speakers"}]

});

//mapping
mongoose.model("events",eventSchema);