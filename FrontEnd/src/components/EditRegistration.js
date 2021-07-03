import React, { Component } from 'react'
import axios from 'axios';
import HeaderLogged from './HeaderLogged'
import { Redirect } from "react-router";

export default class EditRegistration extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.sellerUpdateChange = this.sellerUpdateChange.bind(this);
        this.updateSeller = this.updateSeller.bind(this);
        this.state = {
            profile: []
        };
    }

    initialState = {
        sellerName:'', sellerAddress:'', sellerPhone:'',sellerEmail:'',sellerZip:'',sellerAccNo:'',sellerPassword:''
    }

    componentDidMount(){
        this.sellerDisplay();
   
    }

    sellerDisplay = (sellerId) => {
        axios.get("http://localhost:8080/api/seller/1", sellerId)
            .then(response => response.data)
            .then((data) => {
                this.setState({profile: data});
               
            });
    }


    updateSeller = event => {
       event.preventDefault();

        const seller = {
            sellerId: this.state.sellerId,
            sellerName: this.state.sellerName,
            sellerAddress: this.state.sellerAddress,
            sellerPhone: this.state.sellerPhone,
            sellerEmail: this.state.sellerEmail,
            sellerZip: this.state.sellerZip,
            sellerAccNo: this.state.sellerAccNo,
            sellerPassword: this.state.sellerPassword  
        };

        axios.put("http://localhost:8080/api/seller/1", seller)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Seller Updated Successfully");
                    window.location.href = "/afterEditSeller";
                }
            })
    }

    sellerUpdateChange = event => {
        this.setState({
            [event.target.name]:event.target.value1
        });
    }

    state = {
        redirect: false
    }
    redirectHandler8 = () => {
        this.setState({ redirect: true })
        this.renderRedirect8();
    }
    renderRedirect8 = () => {
        if (this.state.redirect) {
            return <Redirect to='/afterEditSeller' />
        }
    }


    render() {

        const{sellerId,sellerName,sellerAddress,sellerPhone,sellerEmail,sellerZip,sellerAccNo,sellerPassword} = this.state;

        return (
            <div>
                <HeaderLogged/>
                <div className="signup-form">
                    <form className="form-horizontal" onSubmit={this.updateSeller}>
                          <div className="row">
                            <div className="col-8 offset-4">
                                <h2>Edit Details</h2>
                            </div>	
                          </div>
                          {/* value={this.state.profile.sellerName} */}
                        {/* <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="name">ID</label>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="sellerId" value={this.state.profile.sellerId} value1={sellerId} onChange={this.sellerUpdateChange}/>
                                </div>        	
                        </div> */}
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="name">Name</label>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="sellerName" value={this.state.profile.sellerName} value1={sellerName}  onChange={this.sellerUpdateChange}/>
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="address">Address</label>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="sellerAddress" value={this.state.profile.sellerAddress} value1={sellerAddress} onChange={this.sellerUpdateChange} required="required" />
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="number">Tel-Number</label>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="sellerPhone" value={this.state.profile.sellerPhone} value1={sellerPhone} onChange={this.sellerUpdateChange} required="required" />
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="email">Email</label>
                                <div className="col-8">
                                    <input type="email" className="form-control" name="sellerEmail" value={this.state.profile.sellerEmail} value1={sellerEmail} onChange={this.sellerUpdateChange} required="required" />
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="zip">Zip-Number</label>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="sellerZip" value={this.state.profile.sellerZip} value1={sellerZip}  onChange={this.sellerUpdateChange} required="required" />
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="accNo">Account-No</label>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="sellerAccNo" value={this.state.profile.sellerAccNo} value1={sellerAccNo}  onChange={this.sellerUpdateChange} required="required" />
                                </div>        	
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4" htmlFor="password">Password</label>
                                <div className="col-8">
                                    <input type="password" className="form-control" name="sellerPassword" value={this.state.profile.sellerPassword} value1={sellerPassword}  onChange={this.sellerUpdateChange} required="required" />
                                </div>        	
                        </div>
                        
                        <div className="form-group row">
                            <div className="col-8 offset-5">
                                
                            </div>
                                    <button type="submit" onClick={this.redirectHandler8}  className="btn btn-primary btn-lg">Update</button>{this.renderRedirect8()} 
                        </div>		      
                    </form>
              
                </div>
               
            </div>
        )
    }
}
