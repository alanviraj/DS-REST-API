import React, { Component } from 'react'
import axios from 'axios';
import HeaderNormal from './HeaderNormal'
import { Redirect } from "react-router";

export default class DisplayCategories extends Component{
    constructor(props){
        super(props)
        this.state = {
            category: []
        };
    }

    componentDidMount(){
        this.showCatgeories();
    }

    showCatgeories(){
        axios.get("http://localhost:8080/api/categories")
            .then(response => response.data)
            .then((data) => {
                this.setState({category: data});
               
            });
    }
    // this.state.category.map((category) =>

    state = {
    redirect: false
    }
    redirectHandler6 = () => {
        this.setState({ redirect: true })
        this.renderRedirect6();
    }
    renderRedirect6 = () => {
        if (this.state.redirect) {
            return <Redirect to='/displayCategoriesItems' />
        }
    }

    render() {
        return(
            <div>
                <HeaderNormal/>
                <div className="App">
                    <h1>Categories</h1>
                    {
                        this.state.category.map((category) =>(
                            <div className="containerMain" key={this.categoryId}>
                                <div className="cat"> 
                                        <a onClick={this.redirectHandler6}>
                                            <div className="card cardcat">
                                                <img src={`data:itemImage/jpg;base64,${category.catImage}`}/>
                                                    <label id="catName"><center><b>{category.categoryName}</b></center></label>   
                                            </div>
                                        </a>{this.renderRedirect6()} 
                                </div><br/>
                            </div>
                         ))
                    }       
                </div>
            </div>
        )
    }
}    

