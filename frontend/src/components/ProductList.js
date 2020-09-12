import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import med1 from '../images/med1.png';

const Product= props =>(
    <div class="col-4">
    <div class="card" >
        <img class="card-img-top" src={med1} alt="Card image"/>
        <div class="card-body">
          <h4 class="card-title">{props.product.name}</h4>
          <p class="card-text">{props.product.company}</p>
          <p class="card-text">{props.product.dose}</p> 
          <Link to={"/viewProduct/"+props.product._id}>
            <button type="button" className="btn btn-primary btn-block">
              View Product
            </button>
         </Link>
        </div>
      </div>
  </div>
)
class ProductList extends Component {
  
    constructor(props){
        super(props);
        this.state={ products : [] };

    }
    componentDidMount(){
     
        axios.get('/product/getall')
        .then(response => {
            this.setState({products: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })  
    }
    productlist(){
        return this.state.products.map(function(currentProduct, i) {
          //console.log(currentEvent);
          return <Product product={currentProduct} key={i} />
      })
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

export default ProductList;