import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';

const ENDPOINT_URI = 'http://localhost:4000';
const CACHE = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  }
});

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  createUploadLink({
    uri: ENDPOINT_URI,
    fetchOptions: {
      mode: 'cors',
    },
  }),
]);

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: CACHE
});
