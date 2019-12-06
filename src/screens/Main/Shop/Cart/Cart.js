import { createStackNavigator } from 'react-navigation-stack';
import CartView from './CartView';
import ProductDetail from '../ProductDetail/ProductDetail'
import Authentication from '../../../Authentication/Authentication'

const Cart = createStackNavigator({
    CartView: {
        screen: CartView,
        path: '/cartview'
    },
    ProductDetail: {
        screen: ProductDetail,
        path: '/productdetail'
    },
    Authentication: {
        screen: Authentication,
        path: 'authentication'
    }
},
    {
        // initialRouteName = 'CartView',
        headerMode: 'none'
    }
);
Cart.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default Cart;
