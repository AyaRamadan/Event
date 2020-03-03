const express=require("express");
let mongoose=require("mongoose");
eventSchema=require("./../models/eventModel");
eventModel=mongoose.model("events");
let speakerModel=mongoose.model("speakers");
const eventRouter=express.Router();

eventRouter.use((request,response,next) =>{
    if(request.session.role=="admin"){
//Event List
eventRouter.get("/list",function(request,response){
    // response.send("/Event list get");
    eventModel.find({}).populate({path:"mainSpeaker otherSpeaker"})
                .then((data)=>{
                  // response.send(data);
                   response.render(`events/eventList`,{events : data});
                })
                .catch((error)=>{
                    console.log(error+"");
                }) ;  
});

//Event Add get
eventRouter.get("/add",function(request,response){
    // response.send("/Event Add,get");
    speakerModel.find({})
    .then((data)=>{
      // response.send(data);
    //   console.log(data);
      response.render(`events/addEvent`,{speakers : data});
    })
    .catch((error)=>{
        console.log(error+"");
    }) ;  
    
});

//Event Add post
eventRouter.post("/add",function(request,response){
    // response.send("/Event Add,post");
    console.log(request.body);
    let eventModelobj=new eventModel(request.body).save()
    .then((data)=>{
        // response.send(data);
        response.redirect("/event/list")
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 
});

//Event Edit get
eventRouter.get("/edit/:_id",function(request,response){
    // response.send("/Event edit,get");
    eventModel.find({_id:request.params._id})
    .then((eventData)=>{ 
        speakerModel.find({})
        .then((speakerData)=>{
            response.render(`events/eventEdit`,{events : eventData, speakers : speakerData});
        })  
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 
});
//Event Edit post
eventRouter.post("/edit",function(request,response){
    // response.send("/Event edit,post");
    eventModel.update({_id:request.body._id},{$set:request.body})
    .then((data)=>{
        response.redirect("/event/list")
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 
});

//Event Delete
eventRouter.post("/delete",function(request,response){
    //response.send("/Event delete");
    // console.log(request.body);
    eventModel.deleteOne({_id:request.body.ID})
    .then((data)=>{
        response.send(data);
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 
});
    }else{
        response.redirect("/login") ;
     }
    next();
});
//Module Exports
module.exports=eventRouter;