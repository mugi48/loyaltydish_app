import { gql } from '@apollo/client';
import apiClient from './Client';

export const GetStoresQuery = gql`
query Stores($name: String) {
    stores(name_Icontains: $name, disableOnlineOrders:false) {
      count
      edges {
        cursor
        node {
          id
          extraInfo
          isActive
          createdAt
          updatedAt
          deletedAt
          name
          slug
          location
          phoneNumber
          country
          currency
          state
          city
          street
          zipCode
          taxRate
          shortDescription
          longDescription
          deliveryCostPerMileCurrency
          deliveryCostPerMile
          deliveryDistanceLimitMiles
          totalRating
          disableOnlineOrders
          logo
          pictures {
            edges {
              node {
                url
              }
            }
          }
          orderPreparationTimeHours
          entitySource
          entitySourceId
          pk
          address
          countryDisplay
          isOpen
          deliveryCostPerMileAmount
          churnRate
        }
      }
    }
  }`;


  export const GetStoreQuery = gql`
  query Store($slug: ID!) {
    publicStore(id: $slug) {
      name
      slug
      location
      zipCode
      street
      city
      state
      country
      currency
      phoneNumber
      taxRate
      logo
      pk
      address
      isOpen
      id

    }
  }
`;


export const getStores = async (name) => {
    try {
      const { data } = await apiClient.query({
        query: GetStoresQuery,
        variables: { name },
      });
      console.log("LIST OF STORE:", data.stores.edges.map((edge) => edge.node));
      return data.stores.edges.map((edge) => edge.node);
    } catch (error) {
      console.error("Error fetching stores:", error);
      throw error;
    }
  };

  export const useGetStoreQuery = async (variables) => {
    try {
      const { data } = await apiClient.query({
        query: GetStoreQuery,
        variables: { slug: variables },
      });
      console.log("LIST OF STOREDETAILS:", data.publicStore);
      return data.publicStore;
    } catch (error) {
      console.error("Error fetching storesList:", error);
      throw error;
    }
  };
