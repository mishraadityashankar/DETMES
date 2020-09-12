const express = require("express");
const router= express.Router(); 
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const checkauth= require('../auth');
const retailer=require("../models/model_retailer");
const medicine=require("../models/model_medicine");
const product=require("../models/model_product");





// register
router.post("/register",(req,res) => {
 
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            console.log(err)
            return res.status(500).json({
                message : 'something went wrong'
            })
        } 
        else{
          const new_retailer = new retailer({
            email: req.body.email,
            password:hash,
            name:req.body.name,
            address:req.body.address,
            contact:req.body.contact
           });
        
        new_retailer.save()
        .then((result) => {
            res.json(result)
          })
          .catch(err=>{
            console.log(err)
          })
        }
    })
  })

///login aka token generation

router.post("/login",(req,res) => {
    retailer.find({email: req.body.email}).exec()
    .then((user) => {
        if(user.length <1){
          return res.status(401).json({
            message : 'Auth failed'
          });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            
          if(err){
            return res.status(401).json({
              message : 'Auth failed'
            })
          }
  
          if(result)
          {  
            const token= jwt.sign({
               id :user[0]._id,
               name: user[0].name,
               contact: user[0].contact,
               address: user[0].address
            },"secret",
            {
               expiresIn:"1h" 
            })
            
            return res.status(200).send(token)
          }
  
          return res.status(401).json({
            message : 'Auth failed'
         })
       })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
          })
      })
  })


// get retailer by id dashboard
router.get("/dashboard",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
  const userid= req.userData.id;
  retailer.findById(userid,function(err,foundRetailer){
        if(err)
        {
            
            console.log(err);
        }
        else{
            // res.send("edit",{foundCustomer: foundCustomer})
            res.json(foundRetailer);
        }
  })
})




//edit route  for user to update personal info
router.post("/editProfile",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
  const retailerId= req.userData.id;

    retailer.findByIdAndUpdate(retailerId,req.body,function(err){
        if(err){
            // res.redirect("/customer/get");
            console.log(err);
        }else{
            // res.redirect("/customer/get");
            res.send("updated");
        }
    })
})

//delete route to delete account
router.delete("/deleteProfile",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
  const retailerId= req.userData.id;
    retailer.findByIdAndRemove(retailerId,function(err,deletedRetailer){
        if(err){
            // res.redirect("/customer");
            console.log("err is "+err)
        }
        else{
            // res.redirect("/customer");
              res.send("deleted");
              console.log(deletedRetailer)
            // res.redirect("/customer/get");
        }
    })
})

///create product and add to stock
router.post("/createProduct/:id",checkauth,function(req,res){

  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;

  const retailerId= req.userData.id;
  const medicineId= req.params.id;
 
  newProduct= new product({
   retailer_id: retailerId,
   medicine_id: medicineId
  })
 
 product.create(newProduct,function(err,newlyCreatedProduct){
      if (err){
          console.log(err);
      }
      else{
          
          retailer.findByIdAndUpdate(retailerId,{ $push: { stock: newlyCreatedProduct._id } },function(err){
              if(err){
                  
                  console.log(err);
              }else{
                  
                  res.send("product created and added to stock");
              }
          })
      } 
  })
})

/// get stock items for logged in retailer
router.get("/getStockItems",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;

  const retailerId= req.userData.id;
  product.find({retailer_id:retailerId}).populate('retailer_id').populate('medicine_id').exec((err,PopulatedProduct)=>{
      if(!err)
      {
        
        res.json(PopulatedProduct)
      }
  })
})


/// Delete Product by Id from stock for logged in retailer

router.delete("/deleteProduct/:id",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;

  const retailerId= req.userData.id;

  retailer.findByIdAndUpdate(retailerId,{ $pull: { stock:req.params.id } },function(err){
      if(err){
         
          console.log(err);
      }else{
          
          product.findByIdAndRemove(req.params.id,function(err,deletedProduct){
              if(err){
                  // res.redirect("/retailer");
                  console.log("err is "+err)
              }
              else{
                  
                  res.send("product removed from stock as well as deleted from db");
                  
              }
          })
          
      }
  })
  
})

/// see order history
       
       
module.exports=router;