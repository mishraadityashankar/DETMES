const express = require("express");
const router= express.Router(); 
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const checkauth= require('../auth');
const customer=require("../models/model_customer");
const product= require("../models/model_product");



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
          const new_customer = new customer({
            email: req.body.email,
            password:hash,
            name:req.body.name,
            address:req.body.address,
            contact:req.body.contact
           });
        
         new_customer.save()
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
    customer.find({email: req.body.email}).exec()
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
              email:user[0].email,
               id :user[0]._id
            },"secret",
            {
               expiresIn:"1h" 
            })
            console.log(token)
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

// get customer by token via id
router.get("/dashboard",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
  const userid= req.userData.id;
  customer.findById(userid,function(err,foundCustomer){
        if(err)
        {
            
            console.log(err);
        }
        else{
            // res.send("edit",{foundCustomer: foundCustomer})
            res.json(foundCustomer);
        }
  })
})




//edit route  for user to update personal info
router.post("/editProfile",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
  const customerId= req.userData.id;

    customer.findByIdAndUpdate(customerId,req.body,function(err){
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
  const customerId= req.userData.id;
    customer.findByIdAndRemove(customerId,function(err,deleted_customer){
        if(err){
            // res.redirect("/customer");
            console.log("err is "+err)
        }
        else{
            // res.redirect("/customer");
              res.send("deleted");
              console.log(deleted_customer)
            // res.redirect("/customer/get");
        }
    })
})
/// get cart item
router.get("/getCartItems",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
 

 const customerId= req.userData.id;
  customer.findById(customerId).populate('cart').exec((err,PopulatedCustomer)=>{
    if(!err)
    {
      console.log(PopulatedCustomer)
      res.json(PopulatedCustomer.cart)
    }
  })
})

/// add item to cart 
router.post("/addToCart/:id",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
 ///pres object
 const customerId= req.userData.id;

  customer.findByIdAndUpdate(customerId,{ $push: { cart:req.params.id } },function(err){
    if(err){
        // res.redirect("/retailer/get");
        console.log(err);
    }else{
        // res.redirect("/retailer/get");
        res.send("product added to cart");
    }
  })
})


/// clear cart

router.post("/ClearCart",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;

 const customerId= req.userData.id;
 
  customer.findByIdAndUpdate(customerId,{ $set: { cart: []} },function(err){
    if(err){
        // res.redirect("/retailer/get");
        console.log(err);
    }else{
        // res.redirect("/retailer/get");
        res.send("product removed from cart");
    }
 })
})

/// remove item by id from cart

router.post("/removeFromCart/:id",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;

 const customerId= req.userData.id;
 
 customer.findByIdAndUpdate(customerId,{ $pull: { cart: req.params.id} },function(err){
    if(err){
        // res.redirect("/retailer/get");
        console.log(err);
    }else{
        // res.redirect("/retailer/get");
        res.send("product removed from cart");
    }
  })
})

/// buy 
/// see order history
       
       
module.exports=router;