const express = require("express");
const router= express.Router(); 
const product=require("../models/model_product");




/// get all products - accessible to all 
router.get("/getall",function(req,res){
    product.find({}).populate('retailer_id').populate('medicine_id').exec((err,PopulatedProduct)=>{
        if(!err)
        {
          console.log(PopulatedProduct)
          res.json(PopulatedProduct)
        }
    })
})

// get product by id - accessible to all
router.get("/getone/:id",function(req,res){
    
    
    product.findById(req.params.id).populate('retailer_id').populate('medicine_id').exec((err,PopulatedProduct)=>{
        if(!err)
        {
          console.log(PopulatedProduct)
          res.json(PopulatedProduct)
        }
    })
    
})


       
       
module.exports=router;