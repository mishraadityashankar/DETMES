const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const customerSchema = new Schema({
       email:{type:String,required:true},
       password:{
           type:String, required:true
       },
       name:{type:String,required:true},
       contact:{type:Number,required:true},
       address:{type:String,required:true},
       cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
       }],
       history: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
       }]

});
module.exports=mongoose.model('Customer',customerSchema);