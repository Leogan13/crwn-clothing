import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth } from './components/firebase/firebase.utils';
import {createUserProfileDocument} from './components/firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import  {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

class App extends React.Component {
  unsubscribeFromAuth = null;


  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //onAuthStateChanged is always listening to any changes to the state check components sign up and sign in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);// gets the user ref from the function the userRef has the id 

        userRef.onSnapshot(snapShot => {//works like .get() but this method takes a function with snapShot.data() we can actually what is inside the userRef
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      else {
      setCurrentUser(userAuth); //this way the application knows if an user is logged in and which user it is.
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();  
   
  }

  render() {
    return (
      <div> 
        <Header/>
        <Switch> 
          <Route exact path='/' component={HomePage} /> 
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' 
           render={() => this.props.currentUser ? 
            (<Redirect to='/' />) : 
            (<SignInAndSignUpPage/>)} /> 
        </Switch>
      </div>
    );
  }
}

const mapSateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
   
})


export default connect(mapSateToProps, mapDispatchToProps)(App);
