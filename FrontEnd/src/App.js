import React from 'react';
import '../src/css/styles.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import SellerProfile from './components/SellerProfile';
import Registration from './components/Registration';
import AddItem from './components/AddItem';
import EditRegistration from './components/EditRegistration';
import LoginNew from './components/LoginNew';
import DeleteItems from './components/DeleteItems';
import UpdateItems from './components/UpdateItems';
import DisplayCategories from './components/DisplayCategories';
import DisplayItems from './components/DisplayItems';
import SingleItem from './components/SingleItem';

import DeliverPage from "./components/deliver/DeliverPage"

import Pay from './components/Pay';

//import CustomerDetailsForm from './components/customerDetailsForm';
import Model from "./components/Model";

class App extends React.Component {
  render(){
    return (
      <Router>
          <Switch>
          <Route path="/" exact component={DisplayCategories}/>
          <Route path="/towardsRegisterPage" exact component={Registration} />
          <Route path="/edit" exact component={UpdateItems} />
          <Route path="/afterEditItem" exact component={SellerProfile} />
          <Route path="/editSeller" exact component={EditRegistration} />
          <Route path="/editItem" exact component={UpdateItems} />
          <Route path="/deleteItem" exact component={DeleteItems} />
          <Route path="/addItem" exact component={SellerProfile} />
          <Route path="/afterdeleteItem" exact component={SellerProfile} />
          <Route path="/displayCategoriesItems" exact component={DisplayItems} />
          <Route path="/displaySinglePage" exact component={SingleItem} />
          <Route path="/addi" exact component={AddItem} />
          <Route path="/afterEditSeller" exact component={SellerProfile} /> 
          <Route path="/login" exact component={SellerProfile} /> 
          <Route path="/afterRegisterPage" exact component={LoginNew} /> 
          <Route path="/afterRegisterP" exact component={LoginNew} /> 

          <Route path="/deliveries" exact component={DeliverPage}/>    

          <Route path="/creditcard" exact component={Pay} />   

          <Route path="/pinConfirm" component = {Model} />      
          </Switch>      
      </Router>
      
    );
  }
}

export default App;