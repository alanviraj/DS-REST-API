import React from 'react';
import 'react-router-dom';
import services from '../../services/service'
import deliverData from '../../services/deliverService'
import HeaderNormal from '../HeaderNormal';

export default class DeliverPage extends React.Component{
    constructor(props){
        super(props);
        this.onChangeBuyerName = this.onChangeBuyerName.bind(this);
        this.onChangeBuyerEmail = this.onChangeBuyerEmail.bind(this);
        this.onChangeBuyerAddress = this.onChangeBuyerAddress.bind(this);
        this.onChangeBuyerPhone = this.onChangeBuyerPhone.bind(this);
        this.onChangeDeliveryOption = this.onChangeDeliveryOption.bind(this);
        this.onChangePayOption = this.onChangePayOption.bind(this);
        this.saveDelivery = this.saveDelivery.bind(this);
        this.newDelivery = this.newDelivery.bind(this);

        this.state = {
            deliverid:null,
            buyerName:"",
            buyerEmail:"",
            buyerAddress:"",
            buyerPhone:"",
            deliverItemName:this.deliverItemName,
            deliveryCash:this.deliveryCash,
            totalPayment:this.totalPayment,
            deliveryOption:"",
            payOption:"",

            submitted: false
        };

    }

onChangeBuyerName(e){
    this.setState({
        buyerName: e.target.value
    });
}

onChangeBuyerEmail(e){
    this.setState({
        buyerEmail: e.target.value
    });
}

onChangeBuyerAddress(e){
    this.setState({
        buyerAddress: e.target.value
    });
}

onChangeBuyerPhone(e){
    this.setState({
        buyerPhone: e.target.value
    });
}

onChangeDeliveryOption(e){
    this.setState({
        deliveryOption: e.target.value
    });
}

onChangePayOption(e){
    this.setState({
        payOption: e.target.value
    });
}

deliveryCash = (localStorage.getItem('itemPrice') * (10/100));
totalPayment = (localStorage.getItem('itemPrice') * (110/100)).toFixed(2);
deliverItemName = localStorage.getItem('itemName');

    saveDelivery(){
        var data = {
            buyerName:this.state.buyerName,
            buyerEmail:this.state.buyerEmail,
            buyerAddress:this.state.buyerAddress,
            buyerPhone:this.state.buyerPhone,
            deliverItemName:this.state.deliverItemName,
            deliveryCash:this.state.deliveryCash,
            totalPayment:this.state.totalPayment,
            deliveryOption:this.state.deliveryOption,
            payOption:this.state.payOption
            
    };

    deliverData.create(data)
     .then(response =>{
         this.setState({
             deliverid:response.data.deliverid,
             buyerName:response.data.buyerName,
             buyerEmail:response.data.buyerEmail,
             buyerAddress:response.data.buyerAddress,
             buyerPhone:response.data.buyerPhone,
             deliverItemName:response.data.deliverItemName,
             deliveryCash:response.data.deliveryCash,
             totalPayment:response.data.totalPayment,
             deliveryOption:response.data.deliveryOption,
             payOption:response.data.payOption,

             submitted:true
         });
         
     })
     .catch(e => {
         console.log(e);
     })
     

     if(this.state.payOption === "CreditCard"){
        
        this.props.history.push("/creditcard");

     }
     else if(this.state.payOption === "MobilePayment"){
        this.props.history.push("/pinConfirm");
        services.sendPin().then(res =>{       
        }
        );
        
     }
     
    }

    newDelivery(){
        this.setState({
            deliverid:null,
            buyerName:"",
            buyerEmail:"",
            buyerAddress:"",
            buyerPhone:"",
            deliverItemName:this.deliverItemName,
            deliveryCash:this.deliveryCash,
            totalPayment:this.totalPayment,
            deliveryOption:"",
            payOption:"",

            submitted:false
        });
    }



    render(){
        localStorage.setItem('buyerName',this.state.buyerName);
        localStorage.setItem('buyerEmail',this.state.buyerEmail);
        localStorage.setItem('buyerPhone',this.state.buyerPhone);
        localStorage.setItem('totalPayment',this.state.totalPayment);
        return(
            
            <div>
                
                <HeaderNormal/>

                <main id="site-main">
                    <div className="container">            
                        <div className="form-title text-center">
                        <h2 className="text-dark">Select a delivery option</h2>
                        <span className="text-dark">Use below form to choose a delivery option</span>
                        </div>
                                <form id="add_user" method="POST">
                
                                   
                                        <div>
                                        <div className="form-group">
                                        <label htmlFor="name" className="text-dark">Name :</label>
                                        <input type="hidden" name="deliverid" ></input>
                                        <input type="text" name="buyerName" className="form-control" onChange={this.onChangeBuyerName} placeholder="Donnald Johonson" required/>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="itemName" className="text-dark">Item Name :</label>
                                        <input type="text" name="itemName" className="form-control" value={this.deliverItemName}/>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="itemPrice" className="text-dark">Item Price :</label>
                                        <input type="text" name="itemPrice" className="form-control" value={localStorage.getItem('itemPrice')}/>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="deliveryCash" className="text-dark">Delivery Cash :</label>
                                        <input type="text" name="deliveryCash" className="form-control" value={this.deliveryCash}/>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="totalPayment" className="text-dark">Total Payment :</label>
                                        <input type="text" name="totalPayment" className="form-control" value={this.totalPayment}/>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="Email" className="text-dark">Email :</label>
                                        <input type="text" id="buyerEmail" name="buyerEmail" className="form-control" onChange={this.onChangeBuyerEmail} placeholder="example@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required/>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="Address" className="text-dark">Address :</label>
                                        <input type="text" name="buyerAddress" className="form-control" onChange={this.onChangeBuyerAddress} placeholder="Your Delivery Address" required/>
                                        </div>
                                        
                                        <div className="form-group">
                                        <label htmlFor="Phone" className="text-dark">Contact Number :</label>
                                        <input type="numbers" name="buyerPhone" className="form-control"  onChange={this.onChangeBuyerPhone} placeholder="Enter 10 digit valid contact number" pattern="[0-9]{10}" required/>
                                        </div>

                                        <span className="text-dark">Note that we have given you two type of delvery options.</span>
                                        <span className="text-dark">Deliver using a fast delivery hires the delivery company to deliver your product. it is fast method but it 	will cost you 10% of your item payment.</span>
                                        <span className="text-dark">Cash on delivery is free of charge but it is slow compared to the other.</span>  

                                        <div className="form-group">
                                        <label htmlFor="deliveryoption" className="text-dark">Delivery option :</label>
                                            <div className="radio inline">
                                            <input type="radio" id="radio-2" onChange={this.onChangeDeliveryOption} name="deliveryOption" value="FastDelivery" />
                                            <label htmlFor="radio-2" className="radio-label">Fast Delivery</label>
                                            </div>

                                            <div className="radio inline">
                                            <input type="radio" id="radio-3" onChange={this.onChangeDeliveryOption}  name="deliveryOption" value="CashOnDelivery" />
                                            <label htmlFor="radio-3" className="radio-label">Cash On Delivery</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="payoption" className="text-dark">Payment option :</label>
                                            <div className="radio inline">
                                            <input type="radio" id="radio-4" onChange={this.onChangePayOption} name="payOption" value="CreditCard" />
                                            <label htmlFor="radio-4" className="radio-label">Credit Card</label>
                                            </div>

                                            <div className="radio inline">
                                            <input type="radio" id="radio-5" onChange={this.onChangePayOption}  name="payOption" value="MobilePayment" />
                                            <label htmlFor="radio-5" className="radio-label">Mobile Payment</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button className="btn text-dark update" onClick={this.saveDelivery} >Go to Payments</button>
                                        </div> 
                                        </div>
              
                                </form>
                    </div>
                </main>

      <script>

      </script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossOrigin="anonymous"></script>
            <script src="/js/index.js"></script>
            </div>
        );
    }

}
