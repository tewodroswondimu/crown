import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component'

const HatsPage = () => (
  <div>
    <h1>
      HATS
    </h1>
  </div>
); 

function App() {
  return (
    <div>
      <Route exact path='/' component={HomePage}/> 
      <Route path='/hats' component={HatsPage}/>
    </div>
  );
}

export default App;
