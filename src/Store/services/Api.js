import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

import { createApi } from '@reduxjs/toolkit/query/react';
// import { logout } from '../reducers/UserReducer';

const baseQuery = graphqlRequestBaseQuery({
  url: 'https://api.rderly.com/graphql',
  prepareHeaders: (headers, { getState }) => {
    // Retrieve token from redux store
    headers.set('X-Secret-Key', '3SIQkeOY.TuwPP9bZ7F9ItHZX995sKWg9faHfWUtN');

    let token = getState().auth?.accessToken;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } else {
      // use refresh token or navigate to login
    }
    return headers;
  },
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
//   if(result.error && result.error.message.includes("User matching query does not exist.")){
//     api.dispatch(logout());
//   }
  console.log("baseQueryWithReauth",result?.error?.message.includes("User matching query does not exist."))
  return result
}
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiErrorInterceptor),
  endpoints: () => ({}),
});

const apiErrorInterceptor = (next) => {
  try {
    console.error('API request failed with error:', next);

  } catch (error) {
    // Handle error here
    console.error('API request failed with error:', error);

    // Throw the error again to maintain error propagation
    throw error;
  }
};