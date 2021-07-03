import React, { Component } from 'react'
import axios from 'axios';
import HeaderNormal from './HeaderNormal'
import { Redirect } from "react-router";

export default class Registration extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.sellerChange = this.sellerChange.bind(this);
        this.submitSeller = this.submitSeller.bind(this);
    }

    initialState = {
        sellerName:'', sellerAddress:'', sellerPhone:'',sellerEmail:'',sellerZip:'',sellerAccNo:'',sellerPassword:''
    }

    submitSeller = event => {
       
        event.preventDefault();

        const seller = {
            sellerName: this.state.sellerName,
            sellerAddress: this.state.sellerAddress,
            sellerPhone: this.state.sellerPhone,
            sellerEmail: this.state.sellerEmail,
            sellerZip: this.state.sellerZip,
            sellerAccNo: this.state.sellerAccNo,
            sellerPassword: this.state.sellerPassword  
        };

        axios.post("http://localhost:8080/api/seller", seller)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Seller Saved Successfully");
                    window.location.href = "/afterRegisterPage";
                }
            })
    }

    sellerChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    state = {
        redirect: false
    }
    redirectHandler10 = () => {
        this.setState({ redirect: true })
        this.renderRedirect10();
    }
    renderRedirect10 = () => {
        if (this.state.redirect) {
            return <Redirect to='/afterRegisterPage' />
        }
    }

    render() {

        const{sellerName,sellerAddress,sellerPhone,sellerEmail,sellerZip,sellerAccNo,sellerPassword} = this.state;

        return (
            <div>
                <HeaderNormal/>
                <div className="signup-form">
                    <form className="form-horizontal" onSubmit={this.submitSeller}>
                          <div className="row">
                            <div className="col-8 offset-4">
                                <h2>Sign Up</h2>
                            </div>	
                          </div>			
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="name">Name</label>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="sellerName" required="required" value={sellerName} onChange={this.sellerChange} />
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="address">Address</label>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="sellerAddress" required="required" value={sellerAddress} onChange={this.sellerChange}/>
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="number">Tel-Number</label>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="sellerPhone" required="required" value={sellerPhone} onChange={this.sellerChange}/>
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="email">Email</label>
                                <div className="col-8">
                                    <input type="email" className="form-control" name="sellerEmail" required="required" value={sellerEmail} onChange={this.sellerChange}/>
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="zip">Zip-Number</label>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="sellerZip" required="required" value={sellerZip} onChange={this.sellerChange}/>
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="accNo">Account-No</label>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="sellerAccNo" required="required" value={sellerAccNo} onChange={this.sellerChange}/>
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="password">Password</label>
                                <div className="col-8">
                                    <input type="password" className="form-control" name="sellerPassword" required="required" value={sellerPassword} onChange={this.sellerChange}/>
                                </div>        	
                        </div>
                        
                        <div className="form-group row">
                            <div className="col-8 offset-5">
                                <p><label className="form-check-label">
                                        <input type="checkbox" required="required"/> I accept the Terms and policies. 
                                    </label>
                                </p>
                            </div>
                                    <button type="submit"  className="btn btn-primary btn-lg">Sign Up</button>
                                    {/* onClick={this.redirectHandler10}
                                    {this.renderRedirect10()} */}
                        </div>		      
                    </form>
                   
                </div>
                <div className="text-center">Already have an account? <a href="#">Login here</a></div>
            </div>
        )
    }
}

