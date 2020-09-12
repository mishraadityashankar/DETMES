const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const orderSchema = new Schema({
       issue_date:{type:Date,required:true},
       retailer_name:{type:String,required:true},
       retailer_id= { type: mongoose.Schema.Types.ObjectId,ref: 'Retailer'},
       customer_name:{type:String,required:true},
       customer_id= { type: mongoose.Schema.Types.ObjectId,ref: 'Customer'}
});
module.exports=mongoose.model('Order',orderSchema);