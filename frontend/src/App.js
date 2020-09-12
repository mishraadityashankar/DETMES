import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Home from './components/Home';
import Product from './components/ProductList';
import Contact from './components/Contact';
import CustomerLogin from './components/CustomerLogin';
import RetailerLogin from './components/RetailerLogin';
import CustomerDetail from './components/CustomerDetail';
import ViewProduct from './components/ViewProduct';
import CustomerSeeCart from './components/CustomerSeeCart';
import CustomerRegister from './components/CustomerRegister';
import RetailerRegister from './components/RetailerRegister';
import RetailerDetail from './components/RetailerDetail';
import RetailerSeeStock from './components/RetailerSeeStock';
import ViewCartProduct from './components/ViewCartProduct';
import MedicineList from './components/MedicineList';
import ViewMedicine from './components/ViewMedicine';
import ViewStockProduct from './components/ViewStockProduct';

function App() {
  function Logout (){
    alert("want to logout?")
    localStorage.removeItem("token");
  }
  return (
    <div className="App"> 
      <div class="mb-0 jumbotron text-center">
        <h1 >DETMES</h1>      
         <p>Decentralized Transparent Medical & E-commerce Sytem</p>
      </div>  
      <Router>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">Products</Link>
              </li>
              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  Customer
                </a>
                <div class="dropdown-menu">
                   <Link to="/customerRegister" className="dropdown-item">Customer Register</Link>
                   <Link to="/customerlogin" className="dropdown-item">Customer Login</Link>
                   <Link to="/customerdetail" className="dropdown-item">Customer Dashboard</Link>
                   <Link to="/mycart" className="dropdown-item">My Cart</Link>

                </div>
              </li>

              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  Retailer
                </a>
                <div class="dropdown-menu">
                   <Link to="/retailerRegister" className="dropdown-item">Retailer Register</Link>
                   <Link to="/retailerlogin" className="dropdown-item">Retailer Login</Link>
                   <Link to="/retailerdetail" className="dropdown-item">Retailer Dashboard</Link>
                   <Link to="/medicine" className="dropdown-item">Medicines</Link>
                   <Link to="/mystock" className="dropdown-item">My Stock</Link>

                </div>
              </li>

              <li className="nav-item">
                 <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li className="nav-item">
                 <a className ="nav-link" href="/" onClick={Logout}>Logout</a>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/product" component={Product}/>
            <Route path="/viewProduct/:id" component={ViewProduct} />
            <Route path="/medicine" component={MedicineList}/>
            <Route path="/viewMedicine/:id" component={ViewMedicine} />
            <Route path="/viewCartProduct/:id" component={ViewCartProduct} />
            <Route path="/viewStockProduct/:id" component={ViewStockProduct} />
            <Route path="/customerRegister" component={CustomerRegister}/> 
            <Route path="/customerlogin" component={CustomerLogin}/>
            <Route path="/customerdetail" component={CustomerDetail}/>
            <Route path="/mycart" component={CustomerSeeCart}/>

            <Route path="/retailerlogin" component={RetailerLogin}/>
            <Route path="/retailerRegister" component={RetailerRegister}/> 
            <Route path="/retailerdetail" component={RetailerDetail}/>
            <Route path="/mystock" component={RetailerSeeStock}/>
            
            <Route path="/contact" component={Contact}/>

          </Switch>
      </Router> 
    </div>
  );
}

export default App;
