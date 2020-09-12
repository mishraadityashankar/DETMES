import React, { Component } from 'react';
import axios from 'axios';

class RetailerRegister extends Component {
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress=this.onChangeAddress.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeContact=this.onChangeContact.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {
            email: '',
            password: '',
            name : '',
            address : '',
            contact : ''
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
    onChangeName(e){
        this.setState({
            name: e.target.value
        });}

    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }
    onChangeContact(e){
        this.setState({
            contact: e.target.value
        });
    }
  
    onSubmit(e){
      e.preventDefault();
  
      const nw_retailer={
  
          email : this.state.email,
          password : this.state.password,
          name : this.state.name,
          address: this.state.address,
          contact: this.state.contact
      }
  
      axios.post('/retailer/register', nw_retailer)
      .then(res =>{
       alert("Registration Successful")
       this.props.history.push('/retailerLogin');
       window.location.reload();
        
      }).catch(
          (err)=> {console.log(err)
            alert("Something Went Wrong")
        });
  
       
  
      this.setState({
          email:'',
          password:'',
          name:'',
          address:'',
          contact:'',
      })
    }
    render() {
        return (
        <div class="container pt-5 pb-5 pr-5 pl-5">
        <h2 class="text-center">Retailer Register</h2>
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
                    <div class="form-group">
                        <label for="name">Name:</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter name" value={this.state.name} 
                                onChange={this.onChangeName} name="name"/>
                    </div>
                    <div class="form-group">
                        <label for="address">Address:</label>
                            <input type="text" class="form-control" id="address" placeholder="Enter address" value={this.state.address}
                                onChange={this.onChangeAddress} name="address"/>
                    </div>
                    <div class="form-group">
                        <label for="contact">Contact:</label>
                            <input type="tel" class="form-control" id="" value={this.state.contact} placeholder="Enter contact"
                                onChange={this.onChangeContact} name="contact"/>
                    </div>
                    <br/>
                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
        </div>
        );
    }
}

export default RetailerRegister;