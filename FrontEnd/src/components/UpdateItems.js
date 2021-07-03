import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router";
import HeaderLogged from './HeaderLogged'
export default class  UpdateItems extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.updateItemChange = this.updateItemChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.state = {
            item: []
        };
    }

    initialState = {
        itemName:'', itemQuantity:'',itemPrice:'',itemDescription:''
    }

    componentDidMount(){
        this.itemDisplay();
   
    }

    itemDisplay = (itemId) => {
        axios.get("http://localhost:8080/api/buyerView/8", itemId)
            .then(response => response.data)
            .then((data) => {
                this.setState({item: data});
               
            });
    }

    updateItem = event => {
        event.preventDefault();
 
         const item = {
             itemId: this.state.itemId,
             itemName: this.state.itemName,
             itemQuantity: this.state.itemQuantity,
             itemPrice: this.state.itemPrice,
             itemDescription: this.state.itemDescription
          
         };
 
         axios.put("http://localhost:8080/api/items/8", item)
             .then(response => {
                 if(response.data != null) {
                     this.setState(this.initialState);
                     alert("Item Updated Successfully");
                     window.location.href = "/afterEditItem";
                 }
             })
     }

    updateItemChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    state = {
        redirect: false
    }
    redirectHandler12 = () => {
        this.setState({ redirect: true })
        this.renderRedirect12();
    }
    renderRedirect12 = () => {
        if (this.state.redirect) {
            return <Redirect to='/afterEditItem' />
        }
    }

    render() {

        const{itemId,itemName,itemQuantity,itemPrice,itemDescription} = this.state;
       // const history = useHistory();
       // const navigateTo = () => history.push('/editSubmit');

        return (
            <div>
                <HeaderLogged/>
            <div class="container2">  
                <form id="contact">
                    <h3>Update Your Items Here</h3>
                        <fieldset>
                            <input placeholder="Item ID" name="itemId" value={this.state.item.itemId} type="hidden" tabindex="1" required autofocus/>
                        </fieldset>
                        <fieldset>
                            <input placeholder="Item Name" name="itemName" value={this.state.item.itemName} type="text" tabindex="1" required autofocus/>
                        </fieldset>
                        <fieldset>
                            <input placeholder="Item Price" name="itemPrice" value={this.state.item.itemPrice} type="text" tabindex="4" required/>
                        </fieldset>
                        <fieldset>
                            <textarea placeholder="Item Description" name="itemDescription" value={this.state.item.itemDescription} tabindex="5" required></textarea>
                        </fieldset>
                        <fieldset>
                            <button name="submit" onClick={this.redirectHandler12} type="submit" id="contact-submit">Submit</button>{this.renderRedirect12()}
                        </fieldset>
                </form>
            </div>
        </div>
        )
    }
}