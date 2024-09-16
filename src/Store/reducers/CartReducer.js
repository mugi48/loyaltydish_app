import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  addProduct,
  addProductByAddButton,
  changeQuantity,
  changeQuantityByAddButton,
  getTotal,
  removeProduct,
} from '../../helpers/utils';
import { orderApi } from '../services/OrderApi';

const initialState = {
  products: [],
  subTotal: 0,
  salesTax: 0,
  serviceCharges: 0,
  discount: 0,
  taxRate: 0,
  total: 0,
  table: null,
  numOfGuests: 0,
  waiter: {},
  customer: {},
  firstname: '',
  lastname: '',
  phoneNumber: '',
  orderType: 'IN_STORE',
  time: '',
  store: null,
  order: {},
  isDiscountApplied: false,
  activePaymentGateway: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state = {
        ...state,
        products: [...addProduct(state.products, action)],
        ...getTotal([...state.products]),
      };
    },
    removeItem(state, action) {
      state = {
        ...state,
        products: [...removeProduct(state.products, action)],
        ...getTotal([...state.products]),
      };
    },
    addQuantity(state, action) {
      state = {
        ...state,
        products: [...changeQuantity(state, action, true)],
        ...getTotal(state.products),
      };
    },
    reduceQuantity(state, action) {
      state = {
        ...state,
        products: [...changeQuantity(state, action, false)],
        ...getTotal(state.products),
      };
    },
    addButton(state, action) {
      state = {
        ...state,
        products: [...addProductByAddButton(state.products, action)],
        ...getTotal([...state.products]),
      };
    },
    addQuantityByButton(state, action) {
      state = {
        ...state,
        products: [...changeQuantityByAddButton(state, action, true)],
        total: 100,
        ...getTotal(state.products),
      };
    },
    reduceQuantityByButton(state, action) {
      state = {
        ...state,
        products: [...changeQuantityByAddButton(state, action, false)],
        ...getTotal(state.products),
      };
    },
    emptyCart(state, action) {
      // state = {...initialState}
      return initialState;
    },
    setTax(state, action) {
      state = { ...state, taxRate: action.payload };
    },
    setStore(state, action) {
      state = { ...state, store: action.payload };
      return state;
    },
    setOrderType(state, action) {
      state = { ...state, orderType: action.payload };
      return state;
    },
    setOrder(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    setTable(state, action) {
      return {
        ...state,
        table: action.payload,
      };
    },
    setCustomerInfo(state, { payload }) {
      state = {
        ...state,
        firstname: payload.firstname,
        lastname: payload.lastname,
        phoneNumber: payload.phoneNumber,
        location: payload.location,
        time: payload.time,
      };
      return state;
    },
    setDiscount(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    setIsDiscountApplied(state, action) {
      state = {
        ...state,
        isDiscountApplied: action.payload,
      };
      return state;
    },
    setActivePaymentGateway(state, action) {
      state = {
        ...state,
        activePaymentGateway: action.payload,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderApi.endpoints.CreateOrder.matchFulfilled,
      (state, { payload }) => {
        if (payload.bulkCreateOrder.success) {
          return { ...state, order: payload.bulkCreateOrder.order };
        }
        return state;
      },
    );
  },
});

const persistConfig = {
  keyPrefix: 'loyaltydish-customer-ui.',
  key: 'cart',
  version: 1,
  storage,
};

export const {
  addItem,
  addButton,
  removeItem,
  addQuantity,
  reduceQuantity,
  addQuantityByButton,
  reduceQuantityByButton,
  emptyCart,
  setTax,
  setStore,
  setOrderType,
  setOrder,
  setCustomerInfo,
  setTable,
  setDiscount,
  setIsDiscountApplied,
  setActivePaymentGateway,
} = cartSlice.actions;
export default persistReducer(persistConfig, cartSlice.reducer);
