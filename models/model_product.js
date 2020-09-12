const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const productSchema = new Schema({
       image:{type:String,required:false},
       name:{type:String,required:true},
       company:{type:String,required:true},
       retailer_name:{type:String,required:true},
       retailer_id:{ type: mongoose.Schema.Types.ObjectId,ref: 'Retailer'},
       price:{type:Number,required:true},
       manf_date:{type:String,required:true},
       exp_date:{type:String,required:true},
       address:{type:String,required:true},
       contact:{type:Number,required:true},
       dose:{type:String,required:true},
       composition:{type:String,required:true},
       effects:{type:String,required:true},
       side_effects:{type:String,required:true}

});
module.exports=mongoose.model('Product',productSchema);