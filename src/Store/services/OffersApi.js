import { gql } from '@apollo/client';

export const GET_OFFERS_QUERY = gql`
  query Offers($stores_Slug: String) {
    offers(stores_Slug: $stores_Slug) {
      edges {
        node {
          pk
          id
          name
          offerType
          offerValue
          minimumSpendAmount
          minimumSpend
          code
          pictures {
            edges {
              node {
                url
                pk
                picture
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_OFFER_MUTATION = gql`
  mutation AddOffer($orderId: ID!, $discountCode: String!) {
    createOrderDiscount(
      input: { orderId: $orderId, discountCode: $discountCode }
    ) {
      errors
      success
      order {
        id
        pk
      }
    }
  }
`;

export const REMOVE_OFFER_MUTATION = gql`
  mutation ($id: ID!) {
    deleteOrderDiscount(input: { id: $id }) {
      errors
      success
    }
  }
`;
