const express = require("express");
const router= express.Router(); 
const medicine=require("../models/model_medicine");


// get all medicines
router.get("/getall",function(req,res){
    medicine.find({},function(err,medicines){
        if(err)
        {
            
            console.log(err);
        }
        else{
            
             res.json(medicines);

        }
    })
})
// get one medicine by id
router.get("/getone/:id",function(req,res){
    
    
    medicine.findById(req.params.id,function(err,foundMedicine){
        if(err)
        {
          
            console.log(err);
        }
        else{
            
            res.json(foundMedicine);
        }
    })
})
//add medicine
router.post("/add",function(req,res){
   
    medicine.create(req.body,function(err,newlyCreatedMedicine){
         if (err){
            
             console.log(err);
         }
         else{
             // res.redirect("/customer/get");
             res.send(newlyCreatedMedicine);
             console.log(newlyCreatedMedicine);
         } 
     })
 })
 module.exports= router;



