import { createStackNavigator } from 'react-navigation-stack';
import SearchView from './SearchView';
import ProductDetail from '../ProductDetail/ProductDetail'


const Search = createStackNavigator({
    SearchView: {
        screen: SearchView,
        path: '/cartview'
    },
    ProductDetailForSearch: {
        screen: ProductDetail,
        path: '/productdetail'
    }
},
{
    // initialRouteName = 'CartView',
    headerMode:'none'
}
);


export default Search;
