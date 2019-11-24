import { createStackNavigator } from 'react-navigation-stack';
import CartView from './CartView';
import ProductDetail from '../ProductDetail/ProductDetail'


const Cart = createStackNavigator({
    CartView: {
        screen: CartView,
        path: '/cartview'
    },
    ProductDetail: {
        screen: ProductDetail,
        path: '/productdetail'
    }
},
{
    // initialRouteName = 'CartView',
    headerMode:'none'
}
);


export default Cart;
