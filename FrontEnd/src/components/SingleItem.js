import React, { Component } from 'react'
import axios from 'axios';
import HeaderNormal from './HeaderNormal'
import { Redirect } from "react-router";


export default class SingleItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        };
       
    }

    componentDidMount(){
        this.showSingleItems();
    }

   
    showSingleItems = (itemId) => {
        axios.get("http://localhost:8080/api/buyerView/4", itemId)
            .then(response => response.data)
            .then((data) => {
                this.setState({items: data});
               
            });
    }
   
    state = {
        redirect: false
    }
    redirectHandler11 = () => {
        this.setState({ redirect: true })
        this.renderRedirect11();
    }
    renderRedirect11 = () => {
        if (this.state.redirect) {
            return <Redirect to='/deliveries' />
        }
    }

    render () {

        localStorage.setItem('sellerEmail', this.state.items.sellerEmail);
        localStorage.setItem('itemName', this.state.items.itemName);
        localStorage.setItem('itemPrice', this.state.items.itemPrice);

        return(
            <div>
                <HeaderNormal/>
            <div className="contApp2">
                <div class="row border border-5">
                    <div class="col-5">             
                        <img src={`data:itemImage/jpg;base64,${this.state.items.itemImage}`}/>              
                    </div>
                    <div class="col-5">
                        <h5>{this.state.items.itemName}</h5>
                        <p class="mb-2 text-muted  ">Category Name :  {this.state.items.catName}</p>
                        <p><span class="mr-1"><strong>Price :  $ . {this.state.items.itemPrice}</strong></span></p>
                        <p class="pt-1">{this.state.items.itemDescription}</p>
                            <div class="table-responsive">
                                {/* <table class="table table-sm table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <th class="pl-0 w-25" scope="row"><strong>Quantity</strong></th>
                                                <td>{this.state.items.itemQuantity}</td>
                                        </tr>
                                       
                                    </tbody>
                                </table> */}
                            </div>
                            <hr/>
                        {/* <div class="table-responsive mb-2">
                            <table class="table table-sm table-borderless">
                                <tbody>
                                    <tr>
                                    <td class="pl-0 pb-0 w-25">Quantity</td>
                                    <td class="pb-0">Select size</td>
                                    </tr>
                                    <tr>
                                    <td class="pl-0">
                                        <div class="def-number-input number-input safari_only mb-0">
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                            class="minus"></button>
                                        <input class="quantity" min="0" name="quantity" value="1" type="number"/>
                                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                            class="plus"></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="mt-1">
                                            <div class="form-check form-check-inline pl-0">
                                                <input type="radio" class="form-check-input" id="small" name="materialExampleRadios"
                                                checked/>
                                                <label class="form-check-label small text-uppercase card-link-secondary"
                                                for="small">Small</label>
                                            </div>
                                            <div class="form-check form-check-inline pl-0">
                                                <input type="radio" class="form-check-input" id="medium" name="materialExampleRadios"/>
                                                <label class="form-check-label small text-uppercase card-link-secondary"
                                                for="medium">Medium</label>
                                            </div>
                                            <div class="form-check form-check-inline pl-0">
                                                <input type="radio" class="form-check-input" id="large" name="materialExampleRadios"/>
                                                <label class="form-check-label small text-uppercase card-link-secondary"
                                                for="large">Large</label>
                                            </div>
                                        </div>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                        <button type="button" onClick={this.redirectHandler11} class="btn btn-primary btn-md mr-1 mb-2" id="buyNow">Buy now</button>{this.renderRedirect11()}
                       
                    </div>
                </div>
            </div>
        </div>
        )
    }
        
}


