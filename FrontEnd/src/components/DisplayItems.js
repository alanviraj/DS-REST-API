import React, { Component } from 'react'
import axios from 'axios';
import HeaderNormal from './HeaderNormal'
import { Redirect } from "react-router";

export default class DisplayItems extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        };
    }

    componentDidMount(){
        this.showItemCategories();
    }

    showItemCategories = (catName) =>{
        axios.get("http://localhost:8080/api/buyer/Furniture",catName)
            .then(response => response.data)
            .then((data) => {
                this.setState({items: data});
               
            });
    }

    state = {
    redirect: false
    }
    redirectHandler7 = () => {
        this.setState({ redirect: true })
        this.renderRedirect7();
    }
    renderRedirect7 = () => {
        if (this.state.redirect) {
            return <Redirect to='/displaySinglePage' />
        }
    }

    render() {
        return(
            <div>
                <HeaderNormal/>
                <div className="contApp1">
                    <h1>Items</h1>
                        {
                            this.state.items.map((items) => (
                                    <div class="card cardcat1">
                                        <a onClick={this.redirectHandler7}>
                                            <img src={`data:itemImage/jpg;base64,${items.itemImage}`} />
                                            <h4>{items.itemName}</h4>
                                            <p class="price">${items.itemPrice}</p>
                                        </a>{this.renderRedirect7()} 
                                    </div>
                                ))
                        }       
                </div>
            </div>
        )
    }   
}

