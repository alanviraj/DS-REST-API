import React, { Component } from 'react'
import axios from 'axios';
import HeaderNormal from './HeaderNormal'
export default class Pay extends Component {
    
    constructor(props){
        super(props)
        this.state = this.initialState;
        this.paymentChange = this.paymentChange.bind(this);
        this.submitPay = this.submitPay.bind(this);
  }

  submitPay = event =>{
      event.preventDefault();
      const payment = {
        paytype:'paypal',
        description:localStorage.getItem('itemName'),
        total:localStorage.getItem('totalPayment'),
        currency:'USD',
        intent:'Sale'
      };

      axios.post("http://localhost:8080/pay", payment)
      .then(response => {
        if(response.data != null) {
            this.setState(this.initialState);
            window.open(response.data);
        }
        else{
            alert('Payment Failed');
        }
    })
      
  }
  
  paymentChange = event =>{
      this.setState({
        [event.target.name]:event.target.value
      });
  }
  

    render() {

        return (
            <div>
                <HeaderNormal/>

                <div className="container">
            <div className="view-account">  
                <div className="content-panel">
                    <h2 className="title">Payment Details</h2><br/>
                    <div className="billing">
                        <div className="secure text-center margin-bottom-md">
                        <div className="accepted-cards">
                            <ul className="list-inline  row justify-content-center">
                            <li className="col"><img src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/visa-curved-32px.png" alt="Visa"/></li>
                            <li className="col"><img src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/mastercard-curved-32px.png" alt="MasterCard"/></li>
                            <li className="col"><img src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/maestro-curved-32px.png" alt="Maestro"/></li>
                            <li className="col"><img src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/american-express-curved-32px.png" alt="American Express"/></li>
                            </ul>
                        </div>
                        </div>
                        <br/>
                        <form id="billing" className="form-horizontal" onSubmit={this.submitPay}>
                            <div className="form-group row">
                                <label className="col-sm-5 control-label">Payment Type</label>
                                <div className="col-sm-5">
                                <select className="form-control" name="paytype" type="text" required>
                                    <option value="paypal">Paypal</option>
                                </select>
                            </div>
                            </div><br/>
                            <div className="form-group row">
                                <label className="col-sm-5 control-label">Payment Description</label>
                                <div className="col-sm-7">
                                <input type="text" className="form-control" name="description" placeholder="Item Code/Name" value={localStorage.getItem('itemName')} onChange={this.paymentChange} autoComplete="off" required/>
                                </div>
                            </div><br/>
                            <div className="row form-group">
                                <label className="col-sm-5 control-label">Total Charge</label>
                                <div className="form col-sm-4">
                                <input type="text" className="form-control"  name="total" placeholder="Total Charging Amount" value={localStorage.getItem('totalPayment')} onChange={this.paymentChange} required/>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label className="col-sm-5 control-label">Currency Type</label>
                                <div className="col-sm-5">
                                <select className="form-control" name="currency" type="text" required>
                                    <option value="USD">USD</option>
                                </select>
                                </div>
                            </div><br/>
                            <div className="form-group row">
                                <label className="col-sm-5 control-label">Intent</label>
                                <div className="col-sm-7">
                                <input type="text" className="form-control" name="intent" placeholder="Intent of Payment" value='Sale' readonly required/>
                                </div>
                            </div>
                        <hr/>
                        <div className="action-wrapper text-center">
                            <div className="action-btn">
                            <button className="btn btn-success btn-lg" type="submit" >
                                Pay Now
                                <i className="fa fa-chevron-right"></i>
                            </button>
                            </div>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
        )
    }
}