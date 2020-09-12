import React, { Component } from 'react';
import axios from 'axios';

class CustomerLogin extends Component {

    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {
            email: '',
            password: ''
        }
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        });
    }
  
    onSubmit(e){
      e.preventDefault();
  
      console.log('Form submitted');
      console.log(`Email: ${this.state.email}`);
      console.log(`Password: ${this.state.password}`);
  
      const customer={
  
          email : this.state.email,
          password : this.state.password
      }
  
      axios.post('/customer/login', customer)
      .then(res =>{
       localStorage.setItem('token',res.data);
       alert("Login Successful")
       this.props.history.push('/customerdetail');
       window.location.reload();
        
      }).catch(
          (err)=> {console.log(err)
            alert("Something Went Wrong")
        });
  
       
  
      this.setState({
          email:'',
          password:''
      })
    }
    render() {
        return (
        <div class="container pt-5 pb-5 pr-5 pl-5">
        <h2 class="text-center">Customer Login</h2>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6 card pt-5 pb-5 pr-5 pl-5">
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                    value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div class="form-group">
                    <label for="pwd">Password</label>
                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                    </div>
                    <br/>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
        </div>
        );
    }
}

export default CustomerLogin;