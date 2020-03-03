const express=require("express");
const authenticationRouter=express.Router();
let path=require("path");
let mongoose=require("mongoose");
loginSchema=require("./../models/authModel");
require("./../models/speakerModel");
let authModel=mongoose.model("speakers");
//login get
// authenticationRouter.get("/login/:name?/:age?",function(request,response){
//     console.log(request.params);
//     response.send("/login,get");
// });
authenticationRouter.get("/login",(request,response)=>{
   // response.sendFile(path.join(__dirname,'..','views','authentication.html')); 
   response.render("auth/login.ejs");
    });


//login post
authenticationRouter.post("/login",function(request,response,next){
    console.log(request.body);
  
    if(request.body.name=="aya" && request.body.password=="123"){
        // response.locals.name=request.body.name;        
        request.session.role = "admin";
        request.session.name ="Aya";
        response.redirect(`/admin/profile/aya`);
        next();
        
    }else {
        authModel.findOne({userName:request.body.name,password:request.body.password})
            .then((data)=>{
                             
                if(data)
                {
                    request.session.name =request.body.name;
                    response.locals.speakerName = request.session.name;
                    request.session.role = "speaker";               
                    response.redirect(`/speaker/profile/${request.body.name}`); 
                    next();
                }
                else
                    response.redirect("/login");
               
    
            })
            .catch((error)=>{
                
                console.log(error+"");
                          
            }) ;
    }
    
   
  
});

//Registeration get
authenticationRouter.get("/register",function(request,response){
    // response.send("/register,get");
    // response.redirect("/speaker/add");
    response.render(`auth/register`);
});
// Registeration post
authenticationRouter.post("/register",function(request,response){
    
    // response.send("/register,post");
    let speakerModelobj=new authModel(request.body).save()
    .then((data)=>{
        response.render("auth/login");
    })
    .catch((error)=>{
        console.log(error+"");
    }) ;  
});

//logout get
authenticationRouter.get("/logout",function(request,response){
    request.session.destroy(()=>{
        response.redirect("/login");
    })
});




//Module Exports
module.exports=authenticationRouter;
