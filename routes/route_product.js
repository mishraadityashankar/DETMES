const express = require("express");
const router= express.Router(); 
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const retailer=require("../models/model_retailer");
const product=require("../models/model_product");
const checkauth= require("../auth")



/// get all products - accessible to all 
router.get("/getall",function(req,res){
    product.find({},function(err,allProduct){
        if(err)
        {
            // res.redirect("/retailer/get");
            console.log(err);
        }
        else{
            // console.log(retailer);
             res.json(allProduct);

        }
    })
})

// get product by id - accessible to all
router.get("/getone/:id",function(req,res){
    
    
    product.findById(req.params.id,function(err,foundProduct){
        if(err)
        {
            // res.redirect("/softwareDesign/get");
            console.log(err);
        }
        else{
            // res.send("edit",{foundCustomer: foundCustomer})
            res.json(foundProduct);
        }
    })
})

/// get all products of logged in retailer
router.get("/getmy",checkauth,function(req,res){
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"secret");
    req.userData =decoded;

    const retailerId= req.userData.id;
    product.find({retailer_id:retailerId},function(err,allProduct){
        if(err)
        {
            // res.redirect("/retailer/get");
            console.log(err);
        }
        else{
            // console.log(retailer);
             res.json(allProduct);

        }
    })
})


// add product for logged retailer 
router.post("/add",checkauth,function(req,res){

    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"secret");
    req.userData =decoded;

    const retailerId= req.userData.id;
    const retailerName= req.userData.name;
    const retailerContact =req.userData.contact;
    const retailerAddress =req.userData.address;
   
    newProduct= new product({
        name:req.body.name,
        company:req.body.company,
        retailer_name:retailerName,
        retailer_id: retailerId,
        manf_date:req.body.manf_date,
        exp_date:req.body.exp_date,
        price:req.body.price,
        address:retailerAddress,
        contact:retailerContact,
        dose:req.body.dose,
        composition:req.body.composition,
        effects:req.body.effects,
        side_effects:req.body.side_effects
    })
   
   product.create(newProduct,function(err,newlyCreatedProduct){
        if (err){
            // res.redirect("/retailer/get");
            console.log(err);
        }
        else{
            // res.redirect("/retailer/get");
            retailer.findByIdAndUpdate(retailerId,{ $push: { stock: newlyCreatedProduct._id } },function(err){
                if(err){
                    // res.redirect("/retailer/get");
                    console.log(err);
                }else{
                    // res.redirect("/retailer/get");
                    res.send("product created and added to stock");
                }
            })
        } 
    })
})



//edit product route for logged retailer
router.post("/edit/:id",checkauth,function(req,res){
    product.findByIdAndUpdate(req.params.id,req.body,function(err,updatedProduct){
        if(err){
            // res.redirect("/retailer/get");
            console.log(err);
        }else{
            // res.redirect("/retailer/get");
            res.send("updated");
        }
    })
})

//delete route to delete product for logged in retailer
router.delete("/delete/:id",checkauth,function(req,res){
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"secret");
    req.userData =decoded;

    const retailerId= req.userData.id;

    retailer.findByIdAndUpdate(retailerId,{ $pull: { stock:req.params.id } },function(err){
        if(err){
            // res.redirect("/retailer/get");
            console.log(err);
        }else{
            // res.redirect("/retailer/get");
            product.findByIdAndRemove(req.params.id,function(err,deletedProduct){
                if(err){
                    // res.redirect("/retailer");
                    console.log("err is "+err)
                }
                else{
                    // res.redirect("/retailer");
                    res.send("product removed from stock as well as deleted from db");
                    // res.redirect("/retailer/get");
                }
            })
            
        }
    })
    
})

       
       
module.exports=router;