import React, { Component } from 'react';
import axios from 'axios';
class ViewCartProduct extends Component {
    constructor(props){
        super(props);
        this.RemoveFromCart = this.RemoveFromCart.bind(this);
        this.state={
            id: '',
            company: '',
            name: '',
            retailer_name:'',
            retailer_id: '',
            manf_date:'',
            exp_date:'',
            price:'',
            address:'',
            contact:'',
            dose:'',
            composition:'',
            effects:'',
            side_effects:''
        };
        
    }
    RemoveFromCart(){
      const token= localStorage.getItem("token");
      const fakebody={};
      axios.post("/customer/removeFromCart/"+this.props.match.params.id,fakebody,{headers : { 
      'Authorization' :"Bearer "+token}})
      .then(res => {
         alert(res.data)
         this.props.history.push('/mycart');
         window.location.reload();

       }).catch( 
        err => {console.log(err)
            alert("something went wrong")
        })
    }
    componentDidMount(){
     
        axios.get("/product/getone/"+this.props.match.params.id)
        .then(res => {
          console.log(this.props.match.params.id);
            this.setState({
              id: res.data._id,
              name: res.data.medicine_id.name,
              company: res.data.medicine_id.company,
              retailer_name:res.data.retailer_id.name,
              retailer_id:res.data.retailer_id._id,
              manf_date:res.data.medicine_id.manf_date,
              exp_date:res.data.medicine_id.exp_date,
              price:res.data.medicine_id.price,
              address:res.data.retailer_id.address,
              contact:res.data.retailer_id.contact,
              dose:res.data.medicine_id.dose,
              composition:res.data.medicine_id.composition,
              effects:res.data.medicine_id.effects,
              side_effects:res.data.medicine_id.side_effects
          
            });
        })
        .catch(function (error) {
            console.log(error);
        })  
      }
    render() {
        return (
            <div class="pt-5 pb-5 pr-5 pl-5">
            <h2 class="text-center">Product Details</h2>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                
                    <table class="table table-bordered table-light">
                        <tbody>
                        <tr>
                            <td class="text-center">ID</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.id}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Name</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.name}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Company</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.company}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Retailer Name</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.retailer_name}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Retailer Id</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.retailer_id}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Manufacture Date</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.manf_date}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Expiry Date</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.exp_date}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Price</td>
                            <td class="text-center">:</td>
                            <td class="text-center">Rs. {this.state.price}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Address</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.address}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Contact</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.contact}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Dose</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.dose}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Composition</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.composition}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Effects</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.effects}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Side_effects</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.side_effects}</td>
                        </tr>
                        </tbody>
                    </table>
                    
                    
                        
                    <button  type="button" class="btn btn-danger btn-block" onClick={this.RemoveFromCart}>Remove From Cart</button>  
                    <br/>
                    <button type="button" class="btn btn-success  btn-block">Buy Product</button>
                </div>
                <div class="col-3"></div>
            </div>
            </div>
    )}
}

export default ViewCartProduct;