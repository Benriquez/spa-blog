import gql from 'graphql-tag';

const POSTS_FIELDS = gql`
  fragment PostsFields on Post {
    id
    title
    content
    image
    createdAt
    comments {
      id
      postId
      content
      createdAt
    }
  }
`;

const POSTS = gql`
  query GetPosts {
    posts {
      ...PostsFields
    }
  }
  ${POSTS_FIELDS}
`;

const POST = gql`
  query GetPost(
    $id: Int
  ) {
    post(
      id: $id
    ) {
      ...PostsFields
    }
  }
  ${POSTS_FIELDS}
`;

const ADD_POST = gql`
  mutation AddPost(
    $post: PostInput
  ) {
    post: addPost(
      post: $post
    ) {
      ...PostsFields
    }
  }
  ${POSTS_FIELDS}
`;

const UPDATE_POST = gql`
  mutation UpdatePost(
    $post: PostInput
  ) {
    post: updatePost(
      post: $post
    ) {
      ...PostsFields
    }
  }
  ${POSTS_FIELDS}
`;

const ADD_COMMENT = gql`
  mutation AddComment(
    $postId: Int!,
    $content: String!
  ) {
    comment: addComment(
      postId: $postId,
      content: $content
    ) {
      id
      postId
      content
      createdAt
    }
  }
`;

export const queries = {
  POSTS,
  POST,
  ADD_POST,
  UPDATE_POST,
  ADD_COMMENT
}
