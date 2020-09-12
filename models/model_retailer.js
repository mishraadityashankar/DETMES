const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const retailerSchema = new Schema({
       email:{type:String,required:true},
       password:{
           type:String, required:true
       },
       name:{type:String,required:true},
       contact:{type:Number,required:true},
       address:{type:String,required:true},
       stock:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
       }],
       history: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
       }]

});
module.exports=mongoose.model('Retailer',retailerSchema);