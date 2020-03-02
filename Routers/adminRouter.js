const express=require("express");
const adminRouter=express.Router();

//Admin profile get
adminRouter.get("/profile/:name",function(request,response){
     response.render(`auth/adminProfile`,{name : request.params.name});
   
});

//Module Exports
module.exports=adminRouter;