const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const productSchema = new Schema({

       medicine_id:{type: mongoose.Schema.Types.ObjectId,ref: 'Medicine'},
       retailer_id:{ type: mongoose.Schema.Types.ObjectId,ref: 'Retailer'}
       

});
module.exports=mongoose.model('Product',productSchema);