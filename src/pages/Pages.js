import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import News from '../components/News';
import SinglePage from './SinglePage';
import SingleEditPage from './SingleEditPage';
import SingleNewPage from './SingleNewPage';

const Pages = () => {
  const {isLoggedIn} = useAuth();
  const location = useLocation();
  const path = location.pathname;

  return (
    <main className={`app-main${path === '/' ? '' : ' app-main-single'}`}>
      <Switch>
        {isLoggedIn &&
        <Route path={`/news/new`}>
          <SingleNewPage />
        </Route>}
        {isLoggedIn &&
        <Route path={`/news/edit/:id`}>
          <SingleEditPage />
        </Route>}
        <Route path={`/news/:id`}>
          <SinglePage />
        </Route>
        <Route path='/' exact>
          <News />
        </Route>
      </Switch>
    </main>
  );
}

export default Pages;
