const express = require("express"); 
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/DETMES"
const customer_route = require("./routes/route_customer");
const retailer_route = require("./routes/route_retailer");
const order_route = require("./routes/route_order");
const product_route = require("./routes/route_product");
const medicine_route= require("./routes/route_medicine")




app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json()); 

app.get('/',(req,res) =>{
    res.send("hello from server");
})
app.use('/retailer',retailer_route);
app.use('/customer',customer_route);
app.use('/medicine',medicine_route);
// app.use('/order',order_route);
app.use('/product',product_route);


mongoose.Promise=global.Promise;


mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }
    else
    console.log("connected to db")
})



app.listen(process.env.PORT||4000, () => {
  console.log("Server is listening on port: 4000");
});

