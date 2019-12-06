import { INITCART,ADDPRODUCTTOCART, INCRQUANTITY, DECRQUANTITY, REMOVEPRODUCT,SETARRAYPRODUCT ,SETUSER, REMOVECART, INITDRAWER}from './types'
import initData from '../api/initData';
import saveCart from '../api/saveCart';
import getCart from '../api/getCart';

export const initCart = () => async dispatch => {
  const response = await getCart();
  dispatch({ type: INITCART, payload: response });
}

export const addProductToCart = (product) => ({type:ADDPRODUCTTOCART, payload: product});
export const incrQuantity = (product) => ({type:INCRQUANTITY, payload: product});
export const decrQuantity = (product) => ({type:DECRQUANTITY, payload: product});
export const removeProduct = (product) => ({type:REMOVEPRODUCT, payload: product});
export const setArrayProduct = (arrProduct) => ({type:SETARRAYPRODUCT, payload: arrProduct});
export const setUser = (user) => ({type:SETUSER, payload: user});
export const removeCart = () => ({type:REMOVECART, payload: null});
export const initDrawer = (navigation) => ({type:INITDRAWER, payload: navigation});



