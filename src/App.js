import React, { useState }  from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import dateFormat from 'dateformat';

import TimeDuration from './components/TimeDuration';

import logo from './assets/img/logo.png';
import logoWhite from './assets/img/logo-white.png';
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

const GET_POST = gql `
  query GetPost($id:Int) {
    post(id:$id) {
      id
      title
      image
      content
      comments {
        id
        content
        createdAt
      }
    }
  }
`;

function App() {
  const [singleID, setSingleID] = useState(14);
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login">
            <div>Login</div>
          </Route>
          <Route path="/news/:newsid">
            <Single id={singleID} />
          </Route>
          <Route path="/">
            <div className="l-container">
              <div className="post">
                <ul className="post-list">
                  {data.posts.map(post => (
                    <li key={post.id} className="post-item" onClick={() => setSingleID(post.id)}>
                      <Link to={`/news/${post.id}`}>

                        <div className="post-image">
                          <img src={(post.image) != null ? post.image : 'https://dummyimage.com/1000x1000/303030/9498d4&text=No+Thumbnail'}/>
                        </div>
                        <time datetime={dateFormat(post.createdAt, "yyyy-mm-d") }>
                          {dateFormat(post.createdAt, "yy.mm.d") }
                        </time>
                        <p>{post.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

function Single({id}) {
  let { newsid } = useParams();
  const MAX_LENGTH = 50;
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {id},
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div className="single">
      <div className="single-breadcrumb">
        <div className="single-breadcrumb-container">
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link className="active" to="">{`${data.post.title.substring(0, MAX_LENGTH)} ${data.post.title.length > MAX_LENGTH ? '...' : ''}`}</Link></li>
          </ul>
        </div>
      </div>
      <div className="single-content">
        <div className="l-container">
          <div className="single-date">
            <time>
              {data.post.createdAt}
            </time>
          </div>
          <div className="single-title">
            <h2>{data.post.title}</h2>
          </div>
          <div className="single-image">
            <div className="single-image-inner" style={{backgroundImage: data.post.image != null ? "url(" + data.post.image + ")" : "url('https://dummyimage.com/1000x1000/303030/9498d4&text=No+Thumbnail')"}}></div>
          </div>
          <div className="single-text">
            <p>{data.post.content}</p>
          </div>
          <div className="single-comment">
            <h3>COMMENT</h3>
            {`${data.post.comments.length > 0 ? '' : 'No Comment'}`}
            {data.post.comments.map(comments => (
              <ul key={comments.id}>
                <li>
                  <p>{comments.content}</p>
                  <span><TimeDuration date={comments.createdAt}/></span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
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
        <div key={post.id} className="slider-item">
          <img src={(post.image) != null ? post.image : 'https://dummyimage.com/1000x1000/303030/9498d4&text=No+Thumbnail'}/>
        </div>
      ))}
    </div>
  );
}

function Posts({props}) {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [postID, setPostID] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;


  return (
    <section>
      <h2>NEWS</h2>
      <div className="post">
        <ul className="post-list">
          {data.posts.map(post => (
            <li key={post.id} className="post-item" onClick={() => setPostID(post.id)}>
              <Link to={`/news/${post.id}`}>

                <div className="post-image">
                  <img src={(post.image) != null ? post.image : 'https://dummyimage.com/1000x1000/303030/9498d4&text=No+Thumbnail'}/>
                </div>
                <time>
                  {post.createdAt}
                </time>
                <p>{post.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Layout({ children }) {
  const handleClick = e => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <header>
        <div className="header-container l-container">
          <Link to="/">
            <h1>
              <img src={logo}/>
            </h1>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
          {children}
      </main>
      <footer className="footer">
        <div className="footer-container l-container">
          <div className="footer-logo">
            <img src={logoWhite}/>
          </div>
          <div className="footer-text">
            サンプルテキストサンプル ルテキストサンプルテキスト <br/> サンプルテキストサンプル ルテキスト
          </div>
          <div className="footer-arrow" onClick={() => handleClick()}>
            <span></span>
            TOP
          </div>
        </div>
        <small>Copyright&copy;2007-2019 Blog Inc.</small>
      </footer>
    </div>
  );
}
