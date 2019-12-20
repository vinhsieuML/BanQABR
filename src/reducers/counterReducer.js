import {
    INITCART, ADDPRODUCTTOCART, INCRQUANTITY, DECRQUANTITY,
    REMOVEPRODUCT, SETARRAYPRODUCT, SETUSER, REMOVECART, INITDRAWER
} from '../actions/types'

import initData from '../api/initData';
import saveCart from '../api/saveCart';
import getCart from '../api/getCart';
import { act } from 'react-test-renderer';
let initialState = { Cart: [], arrProduct: [], user:null , drawer: null};//arrProduct de tim kiem


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
            saveCart([]);
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
    const newCart = Cart.map(e => {
        if (e.productInfo.size !== size) return e;
        else {
            return { productInfo: e.productInfo, quantity: e.quantity + 1 };
        }
    });
    saveCart(newCart);
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
    saveCart(newArray);
    return newArray;
}

const removeProduct = (Cart, action) => {
    const productId = action.payload.id;
    const size = action.payload.size;
    const newCart = Cart.filter(e => e.productInfo.size !== size);
    saveCart(newCart)
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
    saveCart(newCart);
    return newCart;
}

