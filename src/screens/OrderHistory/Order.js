import { createStackNavigator } from 'react-navigation-stack';
import OrderDetail from './OrderDetail'
import OrderHistory from './OrderHistory'
import ProductDetail from '../Main/Shop/ProductDetail/ProductDetail'
import checkOut from '../Main/Shop/Cart/checkOut'
const Order = createStackNavigator({
    orderview: {
        screen: OrderHistory,
        path: '/orderview'
    },
    orderdetail: {
        screen: OrderDetail,
        path: '/orderdetail',
    },
    productdetail: {
        screen: ProductDetail,
        path: '/productdetail',
    },
    pay:{
        screen: checkOut,
        path: '/pay',
    }
},
    {
        headerMode: 'none'
    }
);
Order.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };


export default Order;
