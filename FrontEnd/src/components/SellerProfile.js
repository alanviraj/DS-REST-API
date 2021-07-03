import React, { Component } from 'react'
import axios from 'axios';
import HeaderLogged from './HeaderLogged'
import { Redirect } from "react-router";


export default class SellerProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],profile:[]
        };
        this.myFunction=this.myFunction.bind(this);
       
    }

    componentDidMount(){
        this.showSellerItems();
        this.sellerprofile();
    }

    showSellerItems = (sellerNum) => {
        axios.get("http://localhost:8080/api/items/0781231231", sellerNum)
            .then(response => response.data)
            .then((data) => {
                this.setState({items: data});
            });
    }

    sellerprofile = (sellerId) => {
        axios.get("http://localhost:8080/api/seller/1", sellerId)
            .then(response => response.data)
            .then((data) => {
                this.setState({profile: data});
               
            });
    }

    myFunction() {
        var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("searchBar");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }

    state = {
        redirect: false,
        redirect1: false,
        redirect2: false
    }
    redirectHandler1 = () => {
        this.setState({ redirect: true })
        this.renderRedirect1();
    }
    renderRedirect1 = () => {
        if (this.state.redirect) {
            return <Redirect to='/editSeller' />
        }
    }

    redirectHandler2 = () => {
        this.setState({ redirect1: true })
        this.renderRedirect2();
    }
    renderRedirect2 = () => {
        if (this.state.redirect1) {
            return <Redirect to='/editItem' />
        }
    }

    redirectHandler3 = () => {
        this.setState({ redirect2: true })
        this.renderRedirect3();
    }
    renderRedirect3 = () => {
        if (this.state.redirect2) {
            return <Redirect to='/deleteItem' />
        }
    }


    render() {
        return (
            
            <div>
                <HeaderLogged/>
                 <div className="container4">
                    <div className="row ">
                        <div className="col-sm-4">
                            <div className="card1">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="100"/>
                                            <div className="mt-3">
                                                <h4>{this.state.profile.sellerName}</h4>
                                                    <button className="btn btn-primary" name="submit" id="btnEditS" type="submit" onClick={this.redirectHandler1}>Edit</button>{this.renderRedirect1()}   
                                            </div>
                                    </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <label>Phone-Number</label><label className="text-secondary">{this.state.profile.sellerPhone}</label>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <label>Email</label><label className="text-secondary">{this.state.profile.sellerEmail}</label>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <label>Account-No</label><label className="text-secondary">{this.state.profile.sellerAccNo}</label>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <label>Zip-Code</label><label className="text-secondary">{this.state.profile.sellerZip}</label>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <label>Address</label><label className="text-secondary">{this.state.profile.sellerAddress}</label>
                                            </li>
                                        </ul>
                                </div>
                            </div>                        
                        </div>
                                    
                             <div className="col-sm-8">
                                <form className="form-inline row">
                                    <input className="form-control col" id="searchBar" onKeyUp={this.myFunction} type="search" placeholder="Search" aria-label="Search"/>
                                    <button className="btn btn-outline-success col-sm-2" type="submit" id="seacrchbtn">Search</button>
                                </form>
                                    <table id="myTable">
                                        <thead>
                                            <tr>
                                                <th>Item Name</th>
                                                <th>Item Price</th>
                                                <th>Item Quantity</th>
                                                <th>Item Description</th>
                                                <th>Category Name</th>
                                                <th>Item Image</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>  
                                            
                                            {
                                                this.state.items.map((items) => (
                                                    <tr>
                                                        <td>{items.itemName}</td>
                                                        <td>{items.itemPrice}</td>
                                                        <td>{items.itemQuantity}</td>
                                                        <td>{items.itemDescription}</td>
                                                        <td>{items.catName}</td>
                                                        <td><img src={`data:itemImage/jpg;base64,${items.itemImage}`} id="sImage" /></td>
                                                        
                                                        <td>
                                                            <a onClick={this.redirectHandler2}  className="btn btn-dark" id="btnEditS1">Edit</a> {this.renderRedirect2()} 
                                                        </td>
                                                       
                                                        <td>
                                                            <a  onClick={this.redirectHandler3} className="btn btn-dark" id="btnDelS1">Delete</a>  {this.renderRedirect3()} 
                                                        </td>
                                                      
                                                    </tr>
                                                ))
                                            }  
                                            
                                        </tbody>           


                                            

                                    </table>

                            </div>    
                    </div>    
                </div>
            )
            </div>

        )
        
    }

    
    
}



 


