import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import CheckOutPage from './pages/checkout/checkout.component';

import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument, addCollectionAndDocument } from './firebase/firebase.utils'

import { selectCollectionsForPreview } from './redux/shop/shop.selector'

class App extends React.Component {
  // constructor() {
  //   super(); 

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null

  componentDidMount() {

    const { setCurrentUser, collectionsArray } = this.props;

    // addCollectionAndDocument('collections', collectionsArray.map(
    //   ({title, items}) => ({
    //             title: title, 
    //             items: items
    // })));
    
    // the parameter user is what the user state is on our firebase is
    // we initialize with a variable so that we can close it when we unmount
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if auth has changed and the user is not null
      if (userAuth) {
        // we need to add await because createUserProfileDocument is an asynchronous function
        const userRef = await createUserProfileDocument(userAuth); 

        // if there are any changes to the snapshot 
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id, 
            ...snapShot.data()
          });

          // save the changes inside the state i.e. this.state.currentUser
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id, 
          //     ...snapShot.data()
          //   }
          // }, () => { // call back function because setState is an asynchronous function
          //   // console.log(this.state.currentUser);
          // })
        })
      }
      else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    // this will close the subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header /> 
         {/* currentUser={this.state.currentUser}/> */}
        <Switch>
          <Route exact path='/' component={HomePage}/> 
          <Route path='/shop' component={ShopPage}/> 
          <Route exact path='/checkout' component={CheckOutPage}/> 
          {/* render is like our class component mehtod, it determines what component to display */}
          <Route exact path='/signin' render={
            () => this.props.currentUser ? 
            (<Redirect to='/' />) : 
            (<SignInAndSignUp />)
          }/>
        </Switch> 
      </div>
    );
  }
}

// dispatch is a way for redux to know that anything passed to it is an
// action object that is passed to every reducer
const mapDispatchStateToProp = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
})

// this allows the App component to have access to the user 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
  collectionsArray: selectCollectionsForPreview
})

export default connect(mapStateToProps, mapDispatchStateToProp)(App);
