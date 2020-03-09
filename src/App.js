import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Maps from './pages/Map'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
    <div className="app">
     <Switch>
     <Route path="/home" component={Home}/>
     <Route path="/citylist" component={CityList}/>
     <Route path="/map" component={Maps}/>
     <Route  component={NotFound}/>
     </Switch>
    </div>
    </Router>
  );
}

export default App;
