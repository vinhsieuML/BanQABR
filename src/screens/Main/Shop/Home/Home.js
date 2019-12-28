import { createStackNavigator } from 'react-navigation-stack';
import { } from 'react-native-elements'
import HomeView from './HomeView'
import ListProduct from '../ListProduct/ListProduct'
import ProductDetail from '../ProductDetail/ProductDetail'

const Home = createStackNavigator({
    homeview: {
        screen: HomeView,
        path: '/homeview'
    },
    listproduct: {
        screen: ListProduct,
        path: '/listproduct',
        // navigationOptions: {
        //     tabBarVisible: false,
        // }
    },
    productdetail: {
        screen: ProductDetail,
        path: 'ProductDetail',
        // navigationOptions: {
        //     tabBarVisible: false,
        // }
    }
},
    {
        // initialRouteName = 'HomeView',
        headerMode: 'none'
    }
);
Home.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };


export default Home;
