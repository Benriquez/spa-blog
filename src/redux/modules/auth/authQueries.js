import gql from 'graphql-tag';

const REGISTER = gql`
  mutation Register(
    $email: String!,
    $password: String!
  ) {
    register(
      email: $email,
      password: $password
    )
  }
`;

const LOGIN = gql`
  mutation Authenticate(
    $email: String!,
    $password: String!
  ) {
    authenticate(
      email: $email,
      password: $password
    )
  }
`;

export const queries = {
  REGISTER,
  LOGIN
}
