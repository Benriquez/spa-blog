import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

// import components here

import logo from './assets/img/logo.png';
import './App.scss';

const GET_POSTS = gql `
 query GetPosts {
   posts {
     id
     image
     title
     content
     createdAt
   }
 }
`;


function App() {

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login">
            <div>Login</div>
          </Route>
          <Route path="/news/:newsId">
            <News />
          </Route>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );

  // return data.posts.map(({ id, title, content }) => (
  //   <div key={id}>
  //     <p>
  //       {id} <br/>
  //       {title} <br/>
  //       {content}
  //     </p>
  //   </div>
  // ));

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

function News() {
  let { newsId } = useParams();
  return <h3>Read content id number: {newsId}</h3>;
}

function Login() {
  return (
    <div>LOGIN</div>
  );
}

function Slider() {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="slider">
      {data.posts.map(post => (
        <div className="slider-item">
          <img src={(post.image) != null ? post.image : 'https://dummyimage.com/1000x1000/303030/9498d4&text=No+Thumbnail'}/>
        </div>
      ))}
    </div>
  );
}

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const MAX_LENGTH = 100;

  return (
    <div className="post">
      <ul className="post-list">
        {data.posts.map(post => (
          <li className="post-item">
            <Link to={`/news/${post.id}`}>
              <div className="post-image">
                <img src={(post.image) != null ? post.image : 'https://dummyimage.com/1000x1000/303030/9498d4&text=No+Thumbnail'}/>
              </div>
              <time datetime={post.createdAt}>
                {post.createdAt}
              </time>
              <p>{`${post.content.substring(0, MAX_LENGTH)} ${post.content.length > MAX_LENGTH ? '...' : ''}`}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Layout({ children }) {
  let match = useRouteMatch();
  return (
    <div>
      <header>
        <Link to="/">
          <img src={logo}/>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Slider />
        <div className="l-container">
          {children}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
