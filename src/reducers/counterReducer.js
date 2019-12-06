import {
    INITCART, ADDPRODUCTTOCART, INCRQUANTITY, DECRQUANTITY,
    REMOVEPRODUCT, SETARRAYPRODUCT, SETUSER, REMOVECART, INITDRAWER
} from '../actions/types'

import initData from '../api/initData';
import saveCart from '../api/saveCart';
import getCart from '../api/getCart';
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
    console.log(action);
    const productId = action.payload.id;
    const newCart = Cart.map(e => {
        if (e.product.id !== productId) return e;
        return { product: e.product, quantity: e.quantity + 1 };
    });
    saveCart(newCart);
    return newCart;
}

const addProductToCart = (Cart, action) => {
    const product = action.payload;
    const isExist = Cart.some(e => e.product.id === product.id);
    if (isExist) {
        return incrQuantity(Cart, action);
    }
    const newArray = Cart.concat({ product, quantity: 1 });
    saveCart(newArray);
    return newArray;
}

const removeProduct = (Cart, action) => {
    const productId = action.payload.id;
    const newCart = Cart.filter(e => e.product.id !== productId);
    saveCart(newCart)
    return newCart;
}

const decrQuantity = (Cart, action) => {
    const productId = action.payload.id;
    var isDelete = false;
    const newCart = Cart.map(e => {
        if (e.product.id !== productId) return e;
        else {
            if (e.quantity - 1 === 0) {
                isDelete = true;
            }
            else {
                return { product: e.product, quantity: e.quantity - 1 };
            }
        }
    });
    if (isDelete === true) {
        return removeProduct(Cart, action);
    }
    saveCart(newCart);
    return newCart;
}

