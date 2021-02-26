import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './Breadcrumbs.scss';

const Breadcrumbs = ({ title }) => {
  return (
    <div className="breadcrumbs">
      <div className="l-container">
        <ul className="breadcrumbs-list">
          <li className="breadcrumbs-item">
            <Link className="breadcrumbs-link" to="/">Home</Link>
          </li>
          <Switch>
            <Route path="/new-post">
              <li className="breadcrumbs-item breadcrumbs-item-current">
                Create New Post
              </li>
            </Route>
          </Switch>
          {title &&
          <li className="breadcrumbs-item breadcrumbs-item-current">
            {title}
          </li>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
