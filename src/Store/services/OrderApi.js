import { gql } from '@apollo/client';

import { currencyToNumber, keyGenerator } from '../../helpers/utils';
import { api } from './Api';

// $deliveryLocation: String!
// deliveryLocation: $deliveryLocation

const CREATE_ORDER = gql`
  mutation bulkCreateOrder(
    $phoneNumber: String!
    $firstname: String
    $lastname: String
    $storeId: ID!
    $orderType: String!
    $addressLine1: String!
    $addressLine2: String!
    $city: String!
    $state: String!
    $country: String!
    $items: [OrderItemInput]!
  ) {
    bulkCreateOrder(
      input: {
        phoneNumber: $phoneNumber
        firstname: $firstname
        lastname: $lastname
        storeId: $storeId
        orderType: $orderType
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        city: $city
        state: $state
        country: $country
        items: $items
      }
    ) {
      success
      errors
      order {
        id
        pk
        orderId
        pickupDt
        delivery {
          id
          location
          delivered
        }
        createdAt
        completedAt
        orderStatus
        orderType
        paymentStatus
      }
    }
  }
`;

const CHECKOUT_ORDER = gql`
  mutation (
    $id: ID!
    $paymentType: String!
    $paymentGatewayParams: JSONString
    $paymentGatewayId: ID
    $cashReceived: Decimal
    $change: Decimal
  ) {
    checkoutOrder(
      input: {
        id: $id
        paymentType: $paymentType
        paymentGatewayId: $paymentGatewayId
        cashReceived: $cashReceived
        change: $change
        paymentGatewayParams: $paymentGatewayParams
      }
    ) {
      success
      errors
      order {
        pk
        id
      }
    }
  }
`;

export const GET_PAYMENTGATEWAY = gql`
  query paymentGatewaysSettings($storeId: ID!) {
    paymentGatewaysSettings(storeId: $storeId) {
      edges {
        node {
          settings
          gateway {
            pk
            id
            name
            displayName
            description
          }
        }
      }
    }
  }
`;

const UPDATE_ORDER_STATUS = gql`
  mutation SetOrderStatus($orderId: ID!, $status: String!) {
    setOrderStatus(input: { orderId: $orderId, status: $status }) {
      success
      errors
    }
  }
`;

const GET_ORDERS = gql`
  query orders($first: Int!, $offset: Int!) {
    orders(
      orderStatus_In: [
        "PLACED"
        "ACCEPTED"
        "DENIED"
        "CANCELED"
        "IN_PREPARATION"
        "READY"
        "COMPLETED"
      ]
      first: $first
      offset: $offset
    ) {
      count
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          orderId
          orderType
          orderStatus
          createdAt
          discounted
          total
          totalAmount
          store {
            name
            isOpen
            currency
          }
          items {
            edges {
              node {
                id
                pk
                isCompleted
                product {
                  pk
                  name
                  price
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
                  priceCurrency
                  productComponentsGroups {
                    edges {
                      node {
                        components {
                          edges {
                            node {
                              name
                              price
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          consumer {
            email
            id
            pk
            phoneNumber
          }
        }
      }
    }
  }
`;

export const GET_ORDER = gql`
  query order($id: ID!) {
    order(id: $id) {
      id
      pk
      orderId
      orderType
      delivery {
        id
        location
        addressLine1
        addressLine2
        city
        state
        country
        zipCode
        delivered
      }
      orderStatus
      createdAt
      discounted
      discounts {
        edges {
          node {
            id
            pk
            offer {
              code
            }
          }
        }
      }
      subtotal
      tax
      total
      totalAmount
      store {
        name
        isOpen
        address
        id
        pk
        slug
        phoneNumber
        phoneNumberDisplay
        address
        logo
        currency
      }
      items {
        count
        edges {
          node {
            pk
            id
            quantity
            extraInfo
            isCompleted
            taxTotal
            cost
            costCurrency
            refunds {
              edges {
                node {
                  pk
                  amount
                  createdAt
                  reason
                }
              }
            }
            components {
              edges {
                node {
                  id
                  pk
                  modifier: component {
                    id
                    pk
                    shortDescription
                    priceAmount
                    name
                    groups {
                      edges {
                        node {
                          id
                          name
                          isRequired
                        }
                      }
                    }
                  }
                }
              }
            }
            product {
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
                          name
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
            }
          }
        }
      }
      consumer {
        email
        id
        pk
        phoneNumber
      }
    }
  }
`;

export const SUBSCRIPE_ORDER = gql`
  subscription order($token: String!, $order: ID!) {
    order(token: $token, orderId: $order) {
      order {
        isActive
        completedAt
        cashReceived
        orderStatus
      }
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation ($id: ID!, $quantity: Int, $notes: String, $extraInfo: JSONString) {
    updateOrderItem(
      input: {
        id: $id
        quantity: $quantity
        notes: $notes
        extraInfo: $extraInfo
      }
    ) {
      errors
      success
      orderItem {
        id
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation (
    $orderId: ID!
    $productId: ID!
    $quantity: Int
    $modifiers: [OrderItemComponentInput]
    $extraInfo: JSONString
  ) {
    createOrderItem(
      input: {
        orderId: $orderId
        productId: $productId
        quantity: $quantity
        modifiers: $modifiers
        extraInfo: $extraInfo
      }
    ) {
      errors
      success
      orderItem {
        id
      }
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation ($id: ID!, $quantity: Int) {
    deleteOrderItem(input: { id: $id, quantity: $quantity }) {
      errors
      success
    }
  }
`;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: module.hot?.status() === 'apply',
  endpoints: (build) => ({
    CreateOrder: build.mutation({
      query: (variables) => ({ document: CREATE_ORDER, variables }),
      invalidatesTags: ['Order'],
    }),
    CompleteOrder: build.mutation({
      query: (variables) => ({ document: CHECKOUT_ORDER, variables }),
      invalidatesTags: ['Order'],
    }),
    UpdateOrderStatus: build.mutation({
      query: (variables) => ({ document: UPDATE_ORDER_STATUS, variables }),
      invalidatesTags: ['Order'],
    }),
    GetPaymentGateway: build.query({
      query: (variables) => ({ document: GET_PAYMENTGATEWAY, variables }),
      transformResponse: (response) => response.paymentGatewaySettings,
    }),
    GetOrders: build.query({
      query: (variables) => ({ document: GET_ORDERS, variables }),
      transformResponse: (response) =>
        [...response.orders.edges.map((edge) => edge.node), response.orders.count],
      providesTags: ['Order'],
    }),
    SubscripeOrder: build.query({
      query: (variables) => ({ document: SUBSCRIPE_ORDER, variables }),
      transformResponse: (response) => response,
    }),
    GetOrder: build.query({
      query: (variables) => ({ document: GET_ORDER, variables }),
      transformResponse: (response) => {
        const data = response.order.items.edges.map((edge) => edge.node);
        const products = data.map((item) => {
          let product = item.product;
          let required = {};
          let optional = {};
          let subTotal = 0;
          let subTotal2 = 0;
          item.components.edges.map(({ node }) => {
            node.modifier.groups.edges.map((group) => {
              let name = group.node.name;
              if (group.node.isRequired) {
                const dd = required;
                let component = node.modifier;
                component.orderComponentId = node.pk;
                dd[name] = component;
                required = { ...required, ...dd };
                subTotal2 = node.modifier.priceAmount;
              } else {
                let dd = optional;
                let component = node.modifier;
                component.orderComponentId = node.pk;
                if (dd[name]) {
                  dd[name].push(component);
                } else {
                  dd[name] = [component];
                }
                optional = { ...optional, ...dd };
                subTotal = subTotal + node.modifier.priceAmount;
              }
            });
          });
          let extraData = {
            quantity: item.quantity,
            oldQuantity: item.quantity,
            optional: optional,
            required: required,
            total: currencyToNumber(item.product.price),
            subTotal: subTotal,
            subTotal2: subTotal2,
            extraInfo: JSON.parse(item.extraInfo)?.notes,
            guest: JSON.parse(item.extraInfo)?.guest,
            orderItemId: item.pk,
            key: keyGenerator(),
            refund: item.refund,
          };
          return { ...product, ...extraData };
        });
        return { ...response.order, products };
      },
    }),
  }),
});

export { injectedRtkApi as orderApi };
export const {
  useCreateOrderMutation,
  useCompleteOrderMutation,
  useGetPaymentGatewayQuery,
  useUpdateOrderStatusMutation,
  useGetOrdersQuery,
  useLazyGetPaymentGatewayQuery,
  useGetOrderQuery,
  useSubscripeOrderQuery,
} = injectedRtkApi;
