import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router";
import HeaderLogged from './HeaderLogged'
export default class DeleteItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: []
        };
        this.deleteItems = this.deleteItems.bind(this);
        this.displayDItems = this.displayDItems.bind(this);
    }

    // deleteItems = (itemId) => {
    //     axios.delete("http://localhost:9090/api/items/9", itemId)
    //         .then(response => {
    //             if(response.data == null) {
    //                 alert("Item Deleted Successfully");
    //                 window.location.href = "/afterdeleteItem";
    //             }
    //         })
    // }

   

    displayDItems = (itemId) => {
        axios.get("http://localhost:8080/api/buyerView/9", itemId)
            .then(response => response.data)
            .then((data) => {
                this.setState({profile: data});
                 
            });
            
    }

    componentDidMount(){
        this.displayDItems();
    }

    deleteItems = (itemId) => {
        axios.delete("http://localhost:8080/api/items/9", itemId)
          
        alert("Item Deleted Successfully");
        window.location.href = "/afterdeleteItem"; 
    }

    state = {
        redirect: false
    }
    redirectHandler5 = () => {
        this.setState({ redirect: true })
        this.renderRedirect5();
    }
    renderRedirect5 = () => {
        if (this.state.redirect) {
            return <Redirect to='/afterdeleteItem' />
        }
    }

    render () {
        return (
            <div>
                <HeaderLogged/>
           <div class="container2k">  
                <form id="contact" onSubmit={this.deleteItems}>
                    <h3>Delete Your Items Here</h3>
                        <fieldset>
                            <input placeholder="Item ID" type="number" name="itemId" value={this.state.profile.itemId}  tabindex="1" required autofocus/>
                        </fieldset>
                        <fieldset>
                            <input placeholder="Item Name" type="text" name="itemName" value={this.state.profile.itemName} tabindex="2" required autofocus/>
                        </fieldset>
                        <fieldset>
                            <button name="submit" type="submit" id="contact-submit" onClick={this.redirectHandler5}>Submit</button>{this.renderRedirect5()}
                        </fieldset>
                </form>
            </div> 
        </div>
        )
    } 
    //onSubmit={this.deleteItems}
   // onClick={this.deleteItems.bind(this, profile.itemId)}
}

// 
// 

