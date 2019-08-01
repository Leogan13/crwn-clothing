import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';


function App() {
  return (
    <div>
      <Route exact path='/' component={Homepage} />
      <Route path='/shop/hats' component={ShopPage}/>
    </div>
  );
}

export default App;
