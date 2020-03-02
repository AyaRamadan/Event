const express=require("express");
let mongoose=require("mongoose");
speakerSchema=require("./../models/speakerModel");
eventSchema=require("./../models/eventModel");
speakerModel=mongoose.model("speakers");
let eventMod=mongoose.model("events");
const speakerRouter=express.Router();
speakerRouter.use((request,response,next) =>{

// //Speakers Add get
speakerRouter.get("/add",function(request,response){
    // response.send("/Speakers Add,get");
    response.render(`auth/register`);
});

//Speakers Add post
speakerRouter.post("/add",function(request,response){
    // response.send("/Speakers Add,post");
 let speakerModelobj=new speakerModel(request.body).save()
    .then((data)=>{
        response.render("auth/login");
    })
    .catch((error)=>{
        console.log(error+"");
    }) ;   
});    

 //Speakers Edit get
speakerRouter.get("/edit/:_id",function(request,response){

    speakerModel.find({_id:request.params._id})
    .then((data)=>{  
    response.render(`speakers/speakerEdit`,{speakers : data,sessionRole:request.session.role});
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 
});
//Speakers Edit post
speakerRouter.post("/edit",function(request,response){
    speakerModel.update({_id:request.body._id},{$set:request.body})
    .then((data)=>{
        // response.send(data);
        if(request.session.role=="admin")
              response.redirect("/speaker/list")
        else{
            response.redirect(`/speaker/profile/${request.body.userName}`);
        }      
    })
    .catch((error)=>{
        console.log(error+"");
    }) ;   
});

if(request.session.role=="admin"){

//speaker list get
speakerRouter.get("/list",function(request,response){
    // response.send("/Speaker list get");
    speakerModel.find({})
                .then((data)=>{
                    //response.send(data);
                     response.render(`speakers/speakerList`,{speakers : data});
                })
                .catch((error)=>{
                    console.log(error+"");
                }) ;   
});

//Speakers Delete
speakerRouter.post("/delete",function(request,response){
    //response.send("/Speakers delete");
    speakerModel.deleteOne({_id:request.body.ID})
    .then((data)=>{
        response.send(data);
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 

});

}else if(request.session.role=="speaker"){
//speaker profile get
speakerRouter.get("/profile/:name",function(request,response){
    speakerModel.find({userName:request.params.name})
    .then((data)=>{
        response.render(`speakers/speakerProfile`,{speakers : data});  
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 
    
});
//speaker event list
speakerRouter.get("/listEvents/:_id",function(request,response){
    
    eventMod.find().or([{mainSpeaker:request.params._id},{otherSpeaker: request.params._id }]).populate({path:"mainSpeaker otherSpeaker"})
    .then((data)=>{  
        // response.send(data);
    response.render(`speakers/speakerEvents`,{speakerEvents : data});
    })
    .catch((error)=>{
        console.log(error+"");
    }) ; 
     
     
});


//Module Exports
}else{
   response.redirect("/login") ;
}
next();
})

module.exports=speakerRouter;
