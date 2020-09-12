// app.post('/addPrescription/:id',(req,res) =>{
//     Prescription.findById(req.params.id)
//      .then((founded_prescription)=>{
//         Patient.findOneAndUpdate(
//             { _id: "5d4191c70fe20a50a0d6d550" }, 
//             { $push: { history: founded_prescription._id } },
//             function (error,cartItem) {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     res.send ("added prescription");
//                 }
//             })
//         }).catch(err=>{
//             console.log(err)
//         })
// })