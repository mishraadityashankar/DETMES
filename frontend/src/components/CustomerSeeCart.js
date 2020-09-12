import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import med1 from '../images/med1.png';

const Product= props =>(
    <div class="col-4 pb-4">
    <div class="card" >
        <img class="card-img-top" src={med1} alt="Card image"/>
        <div class="card-body">
          <h4 class="card-title">Product Id</h4>
          <p class="card-text">{props.product._id}</p>
          <Link to={"/viewCartProduct/"+props.product._id}>
            <button type="button" className="btn btn-primary btn-block">
              View this
            </button>
         </Link>
         <br/>
          <Link to={"/buyProduct/"+props.product._id}>
            <button type="button" className="btn btn-success btn-block">
              Buy this
            </button>
         </Link>
        </div>
      </div>
  </div>
)

class CustomerSeeCart extends Component {
    constructor(props){
        super(props);
        this.state={ products : [] };
    }
    componentDidMount(){
        const token= localStorage.getItem("token");
        
        axios.get('/customer/getCartItems',{headers : { 
            'Authorization' :"Bearer "+token}})
        .then(response => {
            this.setState({products: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })  
    }
    productlist(){
        if(this.state.products.length==0)
        {
           return <h1>Your Cart is empty :(</h1>
        }
        else{
        return this.state.products.map(function(currentProduct, i) {
          //console.log(currentEvent);
          return <Product product={currentProduct} key={i} />
        })
        }
    }

    render() {
        return (
        <div class="container mt-5">
            <div class="row">
                {this.productlist()}
            </div>
        </div>
        );
    }
}

export default CustomerSeeCart;