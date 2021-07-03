import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import service from "../services/service";
import '../../src'
import HeaderNormal from '../components/HeaderNormal'

export default class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custName:localStorage.getItem('buyerName'),
            custEmail:localStorage.getItem('buyerEmail'),
            custPhone:localStorage.getItem('buyerPhone'),
            sellerEmail:localStorage.getItem('sellerEmail'),
            itemName:localStorage.getItem('itemName'),
            itemPrice:localStorage.getItem('itemPrice'),
            otp:"",
            pinError:""
        }
        this.changeOtpHandler=this.changeOtpHandler.bind(this);
    }

    initialState = {
        pinError:""
    }

    changeOtpHandler = (event) =>{
        this.setState({otp: event.target.value});
    }

    cancelHandler = (e) =>{
        e.preventDefault();
        console.log("cancel button hit");
    }

    resendHandler = (e) =>{
        e.preventDefault();
        console.log('reSend button hit');
        service.sendPin().then((res) =>{
            console.log(res);
        });
    }

    confirmHandler = (e) =>{
        e.preventDefault();

        let pinNumber = {
            otp:this.state.otp
        };

        let paymeny = {
            custName: this.state.custName,
            custEmail: this.state.custEmail,
            custPhone: this.state.custPhone,
            sellerEmail: this.state.sellerEmail,
            itemName: this.state.itemName,
            itemPrice:this.state.itemPrice,
        }
        console.log("Confirm button");
        console.log(">>>>> " + JSON.stringify(pinNumber));
        service.getPinVerify(pinNumber).then((res) => {;
            this.initialState.pinError=res.data;
            if(this.initialState.pinError === "OTP verification success !"){
                service.addPayment(paymeny).then(()=>{
                    this.props.history.push('/');
                }).catch(newError =>{
                    console.error(newError);
                })
            }else{
                window.alert(res.data);
                return;
            }
        }).catch(error => {
            window.prompt(error);
        });
    }

    render() {
        return (
            <div>
                <HeaderNormal/>
                <Form className="form_2">
                    <h3>Verify your phone number</h3>
                    <br/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontSize:'medium'}}>Enter PIN</Form.Label>
                        <Form.Control type="text" placeholder="PIN" name="otp"
                        value={this.state.otp} onChange={this.changeOtpHandler}/>
                        <Button variant="success" style={{float:'right',marginLeft:'10px'}} onClick={this.confirmHandler}>
                        Confirm
                    </Button>
                        <Button onClick={this.resendHandler} style={{float:'right',marginLeft:'10px'}}>Resend Pin</Button>
                    </Form.Group>
                    
                    {/* <Button variant="danger" style={{float:'right'}} onClick={this.cancelHandler}>
                        Cancel
                    </Button> */}
                </Form>
            </div>
        );
    }
}
