import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './app/page.js';
import FormBuilder from './pages/formbuilder/page.js';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/formbuilder" component={FormBuilder} />
    </Switch>
  </Router>
);

export default App;