import React from 'react';
import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Home from './components/Home';
import Product from './components/ProductList';
import Customer from './components/Customer';
import Retailer from './components/Retailer';
import Contact from './components/Contact';
import Background from './images/hero_2.jpg';
import './App.css';
import CustomerLogin from './components/CustomerLogin';
import RetailerLogin from './components/RetailerLogin';
import CustomerDetail from './components/CustomerDetail';
import ViewProduct from './components/ViewProduct';
import CustomerSeeCart from './components/CustomerSeeCart';
import CustomerRegister from './components/CustomerRegister';

function App() {
  function Logout (){
    alert("want to logout?")
    localStorage.removeItem("token");
  }
  return (
    <div className="App">     
      <Router>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">Product</Link>
              </li>
              <li className="nav-item">
                <Link to="/customerRegister" className="nav-link">Customer Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/retailer" className="nav-link">Retailer</Link>
              </li>
              <li className="nav-item">
                 <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li>
                 <Link to="/customerlogin" className="nav-link">Customer Login</Link>
              </li>
              <li>
                 <Link to="/customerdetail" className="nav-link">Customer Dashboard</Link>
              </li>
              <li>
                 <Link to="/retailerlogin" className="nav-link">Retailer Login</Link>
              </li>
              <li>
                 <Link to="/mycart" className="nav-link">My cart</Link>
              </li>
              <li>
                 <a className ="nav-link" href="/" onClick={Logout}>Logout</a>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/product" component={Product}/>
            <Route path="/viewProduct/:id" component={ViewProduct} />
            <Route path="/customerRegister" component={CustomerRegister}/>
            <Route path="/retailer" component={Retailer}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/customerlogin" component={CustomerLogin}/>
            <Route path="/customerdetail" component={CustomerDetail}/>
            <Route path="/retailerlogin" component={RetailerLogin}/>
            <Route path="/mycart" component={CustomerSeeCart}/>

          </Switch>
      </Router> 
    </div>
  );
}

export default App;
