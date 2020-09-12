import React, { Component } from 'react';
import axios from 'axios';
class ViewProduct extends Component {
    constructor(props){
        super(props);
        this.AddtoCart = this.AddtoCart.bind(this);
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
    AddtoCart(){
      const token= localStorage.getItem("token");
      const fakebody={};
      axios.post("/customer/addToCart/"+this.props.match.params.id,fakebody,{headers : { 
      'Authorization' :"Bearer "+token}})
      .then(res => {
         alert(res.data)
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
              name: res.data.name,
              company: res.data.company,
              retailer_name:res.data.retailer_name,
              retailer_id:res.data.retailer_id,
              manf_date:res.data.manf_date,
              exp_date:res.data.exp_date,
              price:res.data.price,
              address:res.data.address,
              contact:res.data.contact,
              dose:res.data.dose,
              composition:res.data.composition,
              effects:res.data.effects,
              side_effects:res.data.side_effects
          
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
                    
                    
                        
                    <button  type="button" class="btn btn-success btn-block" onClick={this.AddtoCart}>Add To Cart</button>  
                    <br/>
                    <button type="button" class="btn btn-danger  btn-block">Buy Product</button>
                </div>
                <div class="col-3"></div>
            </div>
            </div>
        );
    }
}

export default ViewProduct;