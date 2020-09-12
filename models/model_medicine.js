const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const medicineSchema = new Schema({
       name:{type:String,required:true},
       company:{type:String,required:true},
       price:{type:Number,required:true},
       manf_date:{type:String,required:true},
       exp_date:{type:String,required:true},
       dose:{type:String,required:true},
       composition:{type:String,required:true},
       effects:{type:String,required:true},
       side_effects:{type:String,required:true}

});
module.exports=mongoose.model('Medicine',medicineSchema);