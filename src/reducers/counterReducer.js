import {
    INITCART, ADDPRODUCTTOCART, INCRQUANTITY, DECRQUANTITY,
    REMOVEPRODUCT, SETARRAYPRODUCT, SETUSER, REMOVECART, INITDRAWER
} from '../actions/types'

import initData from '../api/initData';
import saveCart from '../api/saveCart';
import localSaveCart from '../api/localSaveCart';
import { act } from 'react-test-renderer';
import getToken from '../api/getToken';

let initialState = { Cart: [], arrProduct: [], user: null, drawer: null };//arrProduct de tim kiem


export default function (state = initialState, action) {
    switch (action.type) {
        case INITCART:
            return Object.assign({}, state, {
                ...state,
                Cart: action.payload,
            })
        case ADDPRODUCTTOCART:
            return Object.assign({}, state, {
                ...state,
                Cart: addProductToCart(state.Cart, action)
            })
        case INCRQUANTITY:
            return Object.assign({}, state, {
                ...state,
                Cart: incrQuantity(state.Cart, action)
            });
        case DECRQUANTITY:
            return Object.assign({}, state, {
                ...state,
                Cart: decrQuantity(state.Cart, action)
            });
        case REMOVEPRODUCT:
            return Object.assign({}, state, {
                ...state,
                Cart: removeProduct(state.Cart, action)
            });
        case SETARRAYPRODUCT:
            return Object.assign({}, state, {
                ...state,
                arrProduct: action.payload
            });
        case SETUSER:
            return Object.assign({}, state, {
                ...state,
                user: action.payload
            });
        case REMOVECART:
            localSaveCart([]);
            return Object.assign({}, state, {
                ...state,
                Cart: []
            });
        case INITDRAWER:
            return Object.assign({}, state, {
                ...state,
                drawer: action.payload
            });
        default:
            return state;
    }
}
const incrQuantity = (Cart, action) => {
    const size = action.payload.size;
    var newCart = Cart.map(e => {
        if (e.productInfo.size !== size) return e;
        else {
            return { productInfo: e.productInfo, quantity: e.quantity + 1 };
        }
    });
    
    return newCart;
}

const addProductToCart = (Cart, action) => {
    const size = action.payload.size;
    const isExist = Cart.some(e => e.productInfo.size === size);
    if (isExist) {
        return incrQuantity(Cart, action);
    }
    const productInfo = action.payload;
    const newArray = Cart.concat({ productInfo, quantity: 1 });
    return newArray;
}

const removeProduct = (Cart, action) => {
    const size = action.payload.size;
    const newCart = Cart.filter(e => e.productInfo.size !== size);

    return newCart;
}

const decrQuantity = (Cart, action) => {
    var isDelete = false;
    const size = action.payload.size;
    const newCart = Cart.map(e => {
        if (e.productInfo.size !== size) return e;
        else {
            if (e.quantity - 1 === 0) {
                isDelete = true;
            }
            else {
                return { productInfo: e.productInfo, quantity: e.quantity - 1 };
            }
        }
    });
    if (isDelete === true) {
        return removeProduct(Cart, action);
    }
    return newCart;
}

