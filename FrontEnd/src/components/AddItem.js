import React, { Component } from 'react';
import axios from 'axios';
import HeaderLogged from './HeaderLogged'
import { Redirect } from "react-router";

export default class AddItem extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.itemChange = this.itemChange.bind(this);
        this.submitItem = this.submitItem.bind(this);
    }

    initialState = {
        itemName:'', catName:'', itemQuantity:'',itemPrice:'',itemDescription:'',sellerNum:'',file:'',sellerEmail:''
    }

    submitItem = event => {
       
        event.preventDefault();

        const item = {
            itemName: this.state.itemName,
            catName: this.state.catName,
            itemQuantity: this.state.itemQuantity,
            itemPrice: this.state.itemPrice,
            itemDescription: this.state.itemDescription,
            sellerNum: this.state.sellerNum,
            itemImage: this.state.file,
            sellerEmail: this.state.sellerEmail  
        };

        axios.post("http://localhost:8080/api/", item)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Item Saved Successfully");
                    window.location.href = "/addItem";
                   
                }
            })
    }

    itemChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    state = {
        redirect: false
    }
    redirectHandler4 = () => {
        this.setState({ redirect: true })
        this.renderRedirect4();
    }
    renderRedirect4 = () => {
        if (this.state.redirect) {
            return <Redirect to='/addItem' />
        }
    }

    render() {

        const{itemName,catName,itemQuantity,itemPrice,itemDescription,sellerNum,itemImage,sellerEmail} = this.state;

        return(
            <div>
                <HeaderLogged/>
            <div className="container2">  
                <form id="contact" action="/sellerprofile" method="POST" onSubmit={this.submitItem} encType="multipart/form-data">
                    <h3>Add Your Items Here</h3>
                    <h4>Contact us for custom quote</h4>
                        <fieldset>
                            <input placeholder="Item Name" type="text" tabindex="1" name="itemName" value={itemName} onChange={this.itemChange} required />
                        </fieldset>
                        {/* <fieldset>
                            <input placeholder="Category Name" type="text" tabindex="2" name="catName" value={catName} onChange={this.itemChange} required />
                        </fieldset> */}
                        <fieldset>
                            <select placeholder="Select Category" type="text" name="catName" value={catName} onChange={this.itemChange} tabindex="2" required >
                                <option>Select Category</option>
                                <option>Furniture</option>
                                <option>Music Instruments</option>
                                <option>Fitness Equipments</option>
                            </select>
                        </fieldset>
                        {/* <fieldset>
                            <input placeholder="Item Quantity" type="number" tabindex="3" name="itemQuantity" value={itemQuantity} onChange={this.itemChange} required/>
                        </fieldset> */}
                        <fieldset>
                            <input placeholder="Item Price" type="text" tabindex="4" name="itemPrice" value={itemPrice} onChange={this.itemChange} required/>
                        </fieldset>
                        <fieldset>
                            <textarea placeholder="Item Description" tabindex="5" name="itemDescription" value={itemDescription} onChange={this.itemChange} required></textarea>
                        </fieldset>
                        <fieldset>
                            <input placeholder="Seller Number" type="number" tabindex="6" name="sellerNum" value={sellerNum} onChange={this.itemChange} required/>
                        </fieldset>

                        <fieldset>
                            <input placeholder="Seller Email" type="email" tabindex="7" name="sellerEmail" value={sellerEmail} onChange={this.itemChange} required/>
                        </fieldset>

                        <fieldset>
                            <input placeholder="Select The Picture" type="file" tabindex="8" name="itemImage" value={itemImage} onChange={this.itemChange} required />
                        </fieldset>
                        <fieldset>
                            <button type="submit"  id="contact-submit">Submit</button>
                        </fieldset>
                </form>
            </div>
        </div>
        )
    }
}

// onSubmit={this.submitItem}
// onClick={this.redirectHandler4}{this.renderRedirect4()} 