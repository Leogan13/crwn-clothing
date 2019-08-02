import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'




function App() {
  return (
    <div>
      <Header/>
      <Route exact path='/' component={Homepage} />
      <Route path='/shop' component={ShopPage}/>
      <Route path='/signin' component={SignInAndSignUpPage}/>
    </div>
  );
}

export default App;
