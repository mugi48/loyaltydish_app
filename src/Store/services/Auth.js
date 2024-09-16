import { gql } from '@apollo/client';
import apiClient from './Client';

export const SignUp = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $firstname: String
    $lastname: String
    $userType: String!
  ) {
    register(
      email: $email
      password1: $password
      password2: $password
      firstname: $firstname
      lastname: $lastname
      userType: $userType
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export const Login = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      success
      errors
      unarchiving
      refreshToken
    }
  }
`;

export const registerUserMutation = async (variables) => {
  console.log("🚨🚨🚨signup variables:", variables);
  const res = await apiClient.mutate({
    mutation: SignUp,
    variables,
  });
  return res.data;
};

export const LoginMutation = async (variables) => {
    console.log("Login variables:", variables);
    
    try {
      const res = await apiClient.mutate({
        mutation: Login,
        variables,
      });
            console.log("Response data:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error during login mutation:", error);
      throw error;  
    }
  };
  
