import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Pages from './pages/Pages';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path='/' exact>
            <Hero />
          </Route>
        </Switch>
        <Pages />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
