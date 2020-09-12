const express = require("express");
const router= express.Router(); 
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const checkauth= require('../auth');
const retailer=require("../models/model_retailer");



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

// get all retailer for admin
router.get("/getall",function(req,res){
    retailer.find({},function(err,retailer){
        if(err)
        {
            // res.redirect("/retailer/get");
            console.log(err);
        }
        else{
            // console.log(retailer);
             res.json(retailer);

        }
    })
})
// get retailer by id
router.get("/getone/:id",function(req,res){
    
    retailer.findById(req.params.id,function(err,foundRetailer){
        if(err)
        {
            // res.redirect("/softwareDesign/get");
            console.log(err);
        }
        else{
            // res.send("edit",{foundCustomer: foundCustomer})
            res.json(foundRetailer);
        }
    })
})

// general add retailer route of no use
router.post("/add",function(req,res){

   retailer.create(req.body,function(err,newlyCreatedretailer){
        if (err){
            // res.redirect("/retailer/get");
            console.log(err);
        }
        else{
            // res.redirect("/retailer/get");
            res.send(newlyCreatedretailer);
            console.log(newlyCreatedretailer);
        } 
    })
})



//edit route  for user to update personal info
router.post("/edit/:id",function(req,res){
    retailer.findByIdAndUpdate(req.params.id,req.body,function(err,updated_retailer){
        if(err){
            // res.redirect("/retailer/get");
            console.log(err);
        }else{
            // res.redirect("/retailer/get");
            res.json(updated_retailer);
        }
    })
})

//delete route to delete account
router.delete("/delete/:id",function(req,res){
    retailer.findByIdAndRemove(req.params.id,function(err,deleted_retailer){
        if(err){
            // res.redirect("/retailer");
            console.log("err is "+err)
        }
        else{
            // res.redirect("/retailer");
              res.send("deleted");
              console.log(deleted_retailer)
            // res.redirect("/retailer/get");
        }
    })
})


/// see order history
       
       
module.exports=router;