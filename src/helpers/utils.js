// import jwtDecode from 'jwt-decode';
import { parsePhoneNumber } from 'libphonenumber-js';
import _ from 'lodash';
import moment from 'moment';
import { addButton, addQuantityByButton, reduceQuantityByButton } from '../Store/reducers/CartReducer';

// export function isTokenExpired(token) {
//   const decoded = jwtDecode(token);
//   const currentTime = new Date().getTime() / 1000;
//   return currentTime > decoded.exp;
// }

export function availableCheck(hour, minute) {
  var now = moment();
  var dateToCheck = now.hour(hour).minute(minute);
  return moment().isAfter(dateToCheck);
}

export function currencyToNumber(amount) {
  return Number(amount.replace(/[^0-9.-]+/g, ''));
}

export function keyGenerator() {
  return (
    'id' + Date.now().toString(36) + Math.random().toString(36).substring(2)
  );
}

export function changeQuantity(state, action, value) {
  let products = state.products;
  for (var i in products) {
    if (products[i].key == action.payload) {
      if (value) {
        products[i].quantity = products[i].quantity + 1;
        break;
      } else {
        if (products[i].quantity > 1) {
          products[i].quantity = products[i].quantity - 1;
          break;
        } else {
          products.splice(i, 1);
          break;
        }
      }
    }
  }
  return products;
}

export function changeQuantityByAddButton(state, action, value) {
  let products = state.products;
  for (var i in products) {
    if (products[i].id == action.payload) {
      if (value) {
        products[i].quantity = products[i].quantity + 1;
        break;
      } else {
        if (products[i].quantity > 1) {
          products[i].quantity = products[i].quantity - 1;
          break;
        } else {
          products.splice(i, 1);
          break;
        }
      }
    }
  }
  return products;
}

export const updateItemToDb = async (itemId, cart, dbOrder, updateItem, isAdd, res, dispatch, setError) => {
  // if order is created already
  if (cart.order.pk) {
    const itemPk = dbOrder.items.edges[0].node.pk;
    const old_quantity = cart.products.find((product) => product.id === itemId).quantity;
    let new_quantity = isAdd? old_quantity + 1 : old_quantity - 1;

    try {
      const updateItemRes = await updateItem({
        variables: {
          id: itemPk,
          quantity: new_quantity,
        },
      });

      if (!updateItemRes.data.updateOrderItem.success) {
        // setError(updateItemRes.data.updateOrderItem.errors.nonFieldErrors[0].message)
        setError("Error updating the item quantity. Please try again later.");
        if(isAdd) {
          dispatch(reduceQuantityByButton(itemId));
        } else {
          dispatch(addQuantityByButton(itemId));
        }
      }

      await res.refetch();
    } catch (error) {
      setError("Error updating the item quantity. Please try again later.");
    }
  } else {
    // nothing
  }
};


export const addItemToDb = async (product, cart, orderId, addItem, res, dispatch, setError) => {
  console.log("addItemToDb")
  // if order is created already
  const optional = product?.newComponent;
  const required = product?.required;
  let modifiers_ = [];
  if (optional?.length > 0) {
    optional.map((item) => {
      modifiers_.push({
        "componentId": item.pk,
      });
    }
    );
  }
  if (required?.length > 0) {
    required.map((item) => {
      modifiers_.push({
        "componentId": item.pk,
      });
    }
    );
  }

  console.log("Modifiers: " , modifiers_)

  console.log("CART.ORDER.PK: ", cart.order.pk)
  if (cart.order.pk) {
    console.log("CART.ORDER.PK IS TRUE MYY NIGGA")
    await addItem({
      variables: {
        orderId: orderId,
        productId: product.pk,
        quantity: product.quantity || 1,
        modifiers: modifiers_,
      },
    }).then(async (updateItemRes) => {
      if(!updateItemRes.data.createOrderItem.success) {
        setError(updateItemRes.data.createOrderItem.errors.nonFieldErrors[0].message)
        dispatch(reduceQuantityByButton(product.id));
      }
      await res.refetch();
    }).catch(error => {
      setError("Error adding the selected item. Please try again later.")
      dispatch(reduceQuantityByButton(product.id));
    });
  } else {
    // nothing
    console.log("CART.ORDER.PK IS FALSE MYY NIGGA")
  }
}

export const removeItemFromDb = async (item, cart, dbOrder, removeItem, res, dispatch, setError) => {
  // if order is created already
  if (cart.order.pk) {
    const itemPk = dbOrder.items.edges[0].node.pk;
    try {
      const removeItemRes = await removeItem({
        variables: {
          id: itemPk,
        },
      });

      if (!removeItemRes.data.deleteOrderItem.success) {
        // setError(removeItemRes.data.deleteOrderItem.errors.nonFieldErrors[0].message)
        dispatch(addButton(item))
        setError("Error deleting the item. Please try again later.");
      }
      
      await res.refetch();
    } catch (error) {
      setError("Error deleting the item. Please try again later.");
      dispatch(addButton(item))
    }
  } else {
    // nothing
  }
}

// export const getTotal = (products) =>{
//   var count = 0
//   var salesTax = 0
//   products.map((item, index) =>{
//       // let taxRate = item.stores.edges[0].node.taxRate
//       count = count + ((currencyToNumber(item.price) + item.subTotal + item.subTotal2) * item.quantity);
//       // salesTax = count * (taxRate / 100)
//   })
//  return {subTotal:count.toFixed(2),salesTax:salesTax.toFixed(2),total:(count+salesTax).toFixed(2)}
// }

export const getTotal = (products) => {
  let total = 0;
  let totalTax = 0;
  const taxes = {};

  products.forEach((item) => {
    let itemTax = 0;
    const totalPrice =
      currencyToNumber(item.price) + item.subTotal + item.subTotal2;
    const quantity = item.quantity;

    item.appliedTaxes.edges
      .map((edge) => edge.node)
      .filter((tax) => tax.taxType !== 'BACKWARD_TAX')
      .forEach((tax) => {
        let taxValue = 0;
        if (tax.valueType === 'PERCENTAGE') {
          taxValue = totalPrice * quantity * (tax.valueAmount / 100);
        } else {
          taxValue = tax.valueAmount * quantity;
        }
        if (taxes[tax.name]) {
          taxes[tax.name] += taxValue;
        } else {
          taxes[tax.name] = taxValue;
        }

        itemTax += taxValue;
      });

    total += totalPrice * quantity;
    totalTax += itemTax;
  });

  return {
    discount: 0,
    subTotal: total,
    total: total + totalTax,
    taxes,
  };
};

export const addProduct = (products, action) => {
  const productIndex = products.findIndex(
    (product) => product.key === action.payload.key,
  );
  if (productIndex !== -1) {
    products[productIndex] = action.payload;
  } else {
    products.push(action.payload);
  }
  return products;
};

function areObjectsEqualExceptKeys(
  array,
  objectToMatch,
  keysToExclude = ['key', 'quantity', 'isExist'],
) {
  // const filteredObj1 = _.omit(obj1, keysToExclude);
  // const filteredObj2 = _.omit(obj2, keysToExclude);
  // return _.isEqual(filteredObj1, filteredObj2);
  const index = array.findIndex((obj) =>
    _.isEqual(_.omit(obj, keysToExclude), _.omit(objectToMatch, keysToExclude)),
  );
  return index;
}

export const addProductByAddButton = (products, action) => {
  let extraData = {
    quantity: 1,
    optional: {},
    required: {},
    total: currencyToNumber(action.payload.price),
    subTotal: 0,
    subTotal2: 0,
    extraInfo: '',
    guest: 0,
    newComponent: [],
    deleteComponent: [],
    key: keyGenerator(),
  };
  let product = { ...action.payload, ...extraData };
  products.push(product);
  return products;
};

export const removeProduct = (products, action) => {
  const prevIndex = products.findIndex(
    (item) => item.key === action.payload.key,
  );
  products.splice(prevIndex, 1);
  return products;
};

export function isTabletBasedOnRatio(ratio) {
  if (ratio > 1.6) {
    return false;
  } else {
    return true;
  }
}

export function diff_minutes(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' mins';
  }
  return Math.floor(seconds) + ' sec';
}

export function secondsToHms(d) {
  let difference = d;
  var hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  //var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  //milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  if (hours !== '00') {
    return hours + ':' + minutes + ':' + seconds;
  } else {
    return minutes + ':' + seconds;
  }
}

export function secondsToHm(d) {
  let difference = d;
  var hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  //var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  //milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  return hours + ':' + minutes;
}

export function dateToString(date, slash = true) {
  const today = date;
  var hh = today.getHours();
  var mmm = today.getMinutes();
  hh = (hh < 10 ? '0' : '') + hh;
  mmm = (mmm < 10 ? '0' : '') + mmm;
  var dd = today.getDate(); //getting date part from today's date.
  var yyyy = today.getFullYear(); //getting year from today's date.
  var mm = today.getMonth() + 1; // getting month from today's date.

  mm = (mm < 10 ? '0' : '') + mm; // if month is less than 10 then append '0' before it to make it 'mm' format.
  dd = (dd < 10 ? '0' : '') + dd; // if date is less than 10 then append '0' before it to make it 'dd' format.
  return slash
    ? { date: `${dd}/${mm}/${yyyy}`, time: `${hh}:${mmm}` }
    : { date: `${yyyy}-${mm}-${dd}`, time: `${hh}:${mmm}` };
}

export function filterByDate(start, end, items) {
  return items.filter((item) => {
    let date = new Date(item.updatedAt);
    return date >= start && date <= end;
  });
}

export function filterByHour(hour, items) {
  const Final = items.filter(
    (item) =>
      new Date(item.updatedAt).getTime() > Date.now() - hour * 60 * 60 * 1000,
  );
  return Final;
}

export function getNewX(xVlaue, oldWidth, newWidth) {
  return (xVlaue * newWidth) / oldWidth;
}

export function getArray(items) {
  return items.map((item) => {
    let optional = Object.keys(item.optional);
    let required = Object.keys(item.required);
    let array = [];
    let string = item.name;
    // required.map((key,index)=>{
    //                   string = string+ '\n' + item.required[key].shortDescription
    //                   })

    // optional.map((options)=>{
    //                       return item.optional[options].map((key,index) => {
    //                           string = string+ '\n' + key.shortDescription
    //                       })
    //                   })
    array.push(string);
    array.push(item.quantity.toString());
    array.push(
      (
        (currencyToNumber(item.price) + item.subTotal + item.subTotal2) *
        item.quantity
      ).toFixed(2) + ' INR',
    );
    return array;
  });
}

export function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export function containsObject(obj, list, key = false) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (!key) {
      if (list[i].id === obj.id) {
        return true;
      }
    } else {
      if (list[i].key === obj.key) {
        return true;
      }
    }
  }

  return false;
}

export function tokenizeEmail(str) {
  let lowerEmail = str.toLowerCase();
  let email = lowerEmail.trim();
  return email;
}

export function groupData(rawData) {
  let data = rawData.reduce((r, e) => {
    // get first letter of name of current element
    let group = e?.firstname[0];
    // if there is no property in accumulator with this letter create it
    if (!r[group]) r[group] = { group, data: [e] };
    // if there is push current element to data array for that letter
    else r[group].data.push(e);
    // return accumulator
    return r;
  }, {});

  // since data at this point is an object, to get array of values
  // we use Object.values method
  let result = Object.values(data);
  return result;
}

export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export function getDateString(date, dashboard = false, monthly = false) {
  var myDate = date;

  var month = new Array();
  month[0] = 'Jan';
  month[1] = 'Feb';
  month[2] = 'Mar';
  month[3] = 'Apr';
  month[4] = 'May';
  month[5] = 'Jun';
  month[6] = 'Jul';
  month[7] = 'Aug';
  month[8] = 'Sep';
  month[9] = 'Oct';
  month[10] = 'Nov';
  month[11] = 'Dec';
  var hours = myDate.getHours();
  var minutes = myDate.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  // e.g. "13 Nov 2016 11:00pm";
  if (dashboard) {
    return month[myDate.getMonth()] + ' ' + myDate.getDate() + 'th';
  }
  if (monthly) {
    return month[myDate.getMonth()] + ' ' + myDate.getFullYear();
  }
  return (
    myDate.getDate() +
    ' ' +
    month[myDate.getMonth()] +
    ' ' +
    myDate.getFullYear() +
    ' ' +
    strTime
  );
}

export function calculateQuantitySum(data, id) {
  let sum = 0;
  let idExists = false;

  for (const item of data) {
    if (item.id === id) {
      idExists = true;
      sum += item.quantity;
    }
  }

  if (idExists) {
    return sum;
  } else {
    return false;
  }
}

export const getFormatedPhone = (number, country = 'US') => {
  if (number) {
    const phoneNumber = parsePhoneNumber(number, country);
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.number;
    }
    return null;
  }
  return null;
};

export function formatAddress(location) {
  let address = '';
  if(!location) return;
  if (location.road) address += location.road + ', ';
  if (location.residential) address += location.residential + ', ';
  if (location.suburb) address += location.suburb + ', ';
  if (location.municipality) address += location.municipality + ', ';
  if (location.city) address += location.city + ', ';
  if (location.state) address += location.state + ', ';
  if (location.country) address += location.country;
  if (location.postcode) address += ' ' + location.postcode;
  if (typeof(location)==="string") address = location
  return address.trim();
}

export function formatDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Use toLocaleDateString to format the date
  // Specify the locale as 'en-GB' for British English date format
  // Use options to customize the output format
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return formattedDate;
}
export const countryCodes = {
  'United States': 'US',
  'India': 'IN',
  'New Zealand': 'NZ',
};

const currencySymbols = {
  'USD': '$', // US Dollar
  'INR': '₹', // Indian Rupee
  'NZD': '$', // New Zealand Dollar (Note: NZD uses the same symbol as USD for simplicity)
};

/**
 * Utility function to get the currency symbol from its code
 * @param {string} currencyCode - The currency code (e.g., 'USD', 'INR', 'NZD')
 * @returns {string} The currency symbol (e.g., '$', '₹', '$')
 */
export function getCurrencySymbol(currencyCode) {
  return currencySymbols[currencyCode.toUpperCase()] || '';
}