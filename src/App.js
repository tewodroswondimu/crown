import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super(); 

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    // the parameter user is what the user state is on our firebase is
    // we initialize with a variable so that we can close it when we unmount
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    })
  }

  componentWillUnmount() {
    // this will close the subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/> 
          <Route path='/shop' component={ShopPage}/> 
          <Route path='/signin' component={SignInAndSignUp}/>
        </Switch> 
      </div>
    );
  }
}
export default App;
