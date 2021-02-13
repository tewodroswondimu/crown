import './App.css';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-and-sign-up.component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/> 
        <Route path='/shop' component={ShopPage}/> 
        <Route path='/signin' component={SignInAndSignUp}/>
      </Switch> 
    </div>
  );
}

export default App;
