import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
// import { API_SECRET_KEY, API_ENDPOINT } from '../config';

// import { isTokenExpired } from '../utils';
// import { refreshToken } from './auth';
const getToken = async() => {
  const userCredentialObj = await AsyncStorage.getItem('userCredential');
  if(userCredentialObj !== null){
    userData = JSON.parse(userCredentialObj)
    return userData.token
  }
  return ""

}
const apiHttpLink = createHttpLink({
  // uri: API_ENDPOINT,
  uri:'https://api.rderly.com/graphql',
});

const authLink = setContext(async (req, { headers }) =>
  // let $token = localStorage.getItem('access-token');

  // if ($token && isTokenExpired($token) && req.operationName !== 'RefreshToken') {
  //   const $refresh = localStorage.getItem('refresh-token');
  //   if ($refresh) {
  //     const { token, refreshToken: refresh, success } = await refreshToken($refresh);
  //     if (token && success) {
  //       localStorage.setItem('access-token', token);
  //       localStorage.setItem('refresh-token', refresh);
  //       $token = token;
  //     } else {
  //       localStorage.removeItem('access-token');
  //       localStorage.removeItem('refresh-token');
  //     }
  //   }
  // }

  ({
    headers: {
      ...headers,
      authorization: `Bearer ${await getToken()}`,
      'X-Secret-Key': '3SIQkeOY.TuwPP9bZ7F9ItHZX995sKWg9faHfWUtN',
    },
  }),
);

// export default new ApolloClient({
//   link: authLink.concat(apiHttpLink),
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'no-cache',
//       errorPolicy: 'ignore',
//     },
//     query: {
//       fetchPolicy: 'no-cache',
//       errorPolicy: 'all',
//     },
//   },
// });




const httpLink = new HttpLink({
  uri: 'https://api.rderly.com/graphql', // Replace with your GraphQL HTTP endpoint
});

const wsLink = new WebSocketLink({
  uri: 'https://api.rderly.com/graphql', // Replace with your GraphQL WebSocket endpoint
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link:authLink.concat(link),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default client;