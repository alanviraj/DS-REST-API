import React, { Component } from 'react'
import abcshooping from '../abcshooping.jpg';
import axios from 'axios';
import HeaderNormal from './HeaderNormal'
import { Redirect } from "react-router";

export default class LoginNew extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.login = this.login.bind(this);
        this.credentialChange = this.credentialChange.bind(this);
    }

    initialState = {
        sellerEmail:'',sellerPassword:''
    }

    login = event => {
       
        event.preventDefault();

        const seller = {
            sellerEmail: this.state.sellerEmail,
            sellerPassword: this.state.sellerPassword  
        };

        axios.post("http://localhost:8080/api/seller/login", seller)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Login Successfull");
                    window.location.href = "/login";
                }
                else {
                    alert("Login Faliure")
                }
               
            })
    }

    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };
 

    state = {
        redirect: false
    }
    redirectHandler = () => {
        this.setState({ redirect: true })
        this.renderRedirect();
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/towardsRegisterPage' />
        }
    }

    redirectHandler9 = () => {
        this.setState({ redirect: true })
        this.renderRedirect9();
    }
    renderRedirect9 = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }

    render() {

        const{sellerEmail,sellerPassword} = this.state;

        return (
            <div>
               <HeaderNormal/>
                <div className="container1">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card-group mb-0">
                                <div className="card p-4">
                                    <div className="card-body">
                                    <form onSubmit={this.login}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                            <div className="input-group mb-3">
                                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                    <input type="email" className="form-control" placeholder="sellerEmail" name="sellerEmail" value={sellerEmail} onChange={this.credentialChange} required/>
                                            </div>
                                            <div className="input-group mb-4">
                                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
     
                                                    <input type="password" className="form-control" placeholder="sellerPassword" name="sellerPassword" onChange={this.credentialChange} required/>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <button type="submit"  className="btn btn-success px-4" id="btnLogin">Login</button>
                                                    {/* onClick={this.redirectHandler9}{this.renderRedirect9()} */}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card text-white shopping py-5" style={{backgroundImage:'url('+abcshooping+')'}}>
                                    <div className="card-body text-center">
                                        <div className="shoppingpic">
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <button type="submit" className="btn-success" id="btnlRegister" onClick={this.redirectHandler}>Register Now!</button>{this.renderRedirect()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
               
            </div>
        )
    }
}

