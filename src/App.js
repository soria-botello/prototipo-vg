import logo from './logo.svg';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Units from './components/Units';
import Unit from './components/Unit';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/unidades" component={Units} />
        <Route path="/unidad/:unitId" component={Unit} />
      </Switch>
    </Router>
  );
}

export default App;