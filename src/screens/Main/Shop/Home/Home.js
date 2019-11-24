import React, { Component } from 'react';
import { View, Text,Button, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Collection from './Collection'
import {} from 'react-native-elements'
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
        path: '/listproduct'
    },
    productdetail:{
        screen: ProductDetail,
        path: 'ProductDetail'
    }
},
{
    // initialRouteName = 'HomeView',
    headerMode:'none'
}
);


export default Home;
