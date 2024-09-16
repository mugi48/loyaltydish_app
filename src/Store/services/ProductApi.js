import { gql } from '@apollo/client';
import apiClient from './Client';

export const PRODUCTS_LIST = gql`
query Products(
  $slug: String

) {
  products(
    isActive: true
    stores_Slug: $slug

  ) {

    edges {
      node {
        pk
        id
        name
        priceCurrency
        price
        shortDescription
        description
        outOfStock
        priceAmount
        appliedTaxes {
          edges {
            node {
              pk
              name
              taxType
              valueType
              valueAmount
              valueDisplay
            }
          }
        }
        category {
          name
          pk
        }
        pictures {
          edges {
            node {
              pk
              picture
              order
              url
            }
          }
        }
        productComponentsGroups(isActive: true) {
          edges {
            node {
              id
              pk
              name
              isRequired
              minNumOfComponents
              maxNumOfComponents
              components(isActive: true) {
                edges {
                  node {
                    id
                    pk
                    shortDescription
                    price
                    priceCurrency
                  }
                }
              }
              extraInfo
            }
          }
        }
        availabilities {
          edges {
            node {
              id
              isAvailable
              startTime
              endTime
            }
          }
        }
        quantities {
          edges {
            node {
              quantity
            }
          }
        }
        stores(slug: $slug) {
          edges {
            node {
              pk
            }
          }
        }
      }
    }
  }
}
`;

const CATEGORIES_QUERY = gql`
  query ($storeSlug: String) {
    productCategories(storeSlug: $storeSlug) {
      edges {
        node {
          pk
          id
          name
          products {
            count
          }
        }
      }
    }
  }
`;


export const useGetProductsQuery = async (variables) => {
    try {
      const { data } = await apiClient.query({
        query: PRODUCTS_LIST,
        variables,
      });
  
      const products = data.products.edges.map((edge) => edge.node);
      console.log("LIST OF PRODUCTS:", products);
      return { products }; // Ensure correct return format
    } catch (error) {
      console.error("Error fetching productList:", error);
      throw error;
    }
  };
  