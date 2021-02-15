import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';

// const getPosts = gql`
//   query GetPosts {
//     posts {
//       id
//       title
//       content
//     }
//
//     post(id: 2) {
//       id
//       title
//       content
//     }
//   }
// `;

const AddPost = gql`
  mutation AddPost($title: String!, $content: String) {
    addPost(post: { title: $title, content: $content }) {
      id
      title
      content
    }
  }
`;


function App() {
  const { loading, error, data } = useQuery(getPosts);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error</p>;

  return (
    <div className="gqaphql">
      {data.posts.map(post => (
        <div className="post">
          <a href="">
            <p className="title">{post.title}</p>
          </a>
        </div>
      ))}

      <h2>Selected Post</h2>
      <div className="selectedPost">
        {data.post.id}
        {data.post.title}
      </div>
    </div>
  );
}

export default App;
