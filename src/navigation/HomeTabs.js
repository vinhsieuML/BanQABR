import React, { Component } from 'react';
import { BottomTabBar,createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Icon, Text, Button, Badge } from 'react-native-elements';
import global from '../global'

import Home from '../screens/Main/Shop/Home/Home'
import Contact from '../screens/Main/Shop/Contact/Contact'
import Cart from '../screens/Main/Shop/Cart/Cart'
import Search from '../screens/Main/Shop/Search/Search'
import { View } from 'react-native';
import Header from '../screens/Main/Shop/Header'
import withBadge from '../navigation/withBadge'

const TabBarComponent = props => <BottomTabBar {...props} />;

const BadgedIcon = withBadge(1)(Icon);

import initData from '../api/initData';
import saveCart from '../api/saveCart';
import getCart from '../api/getCart';




const HomeTabsnonHeader = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      path: '/buttons',
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Buttons',
        tabBarIcon: ({ tintColor, focused }) => (
          <View>
            <Icon
              name={focused ? 'emoticon-cool' : 'emoticon-neutral'}
              size={24}
              type="material-community"
              color={tintColor}
            />

          </View>
        ),
      },
    },
    Cart: {
      screen: Cart,
      path: '/Cart',
      navigationOptions: {
        title: 'Cart',
        tabBarLabel: 'Cart',
        tabBarIcon: ({ tintColor, focused }) => (
          // <Icon 
          // name="shopping-cart" 
          // size={24} 
          // type="ionicons" 
          // color={tintColor}
          // />
          <BadgedIcon
            name="shopping-cart"
            size={24}
            type="ionicons"
            color={tintColor}
          />
        ),

      },
    },
    Search: {
      screen: Search,
      path: '/Search',
      navigationOptions: {
        title: 'Search',
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name="search" size={24} type="ionicons" color={tintColor} />
        ),
      },
    },
    Contact: {
      screen: Contact,
      path: '/Contact',
      navigationOptions: {
        title: 'Contact',
        tabBarLabel: 'Contact',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name="info" size={24} type="ionicons" color={tintColor} />
        ),
      },
    },



  },
  {
    initialRouteName: 'Home',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
    tabBarComponent: props => {
      const currentIndex = props.navigation.state.index;

      return (
        <TabBarComponent
          {...props}
          style={
            currentIndex === 1 && {
              backgroundColor: 'rgba(47,44,60,1)',
              borderTopWidth: 0,
            }
          }
          navigation={{
            ...props.navigation,
            state: {
              ...props.navigation.state,
              routes: props.navigation.state.routes,
            },
          }}
        />
      );
    },
  }
);

const HomeTabNavigator = createAppContainer(HomeTabsnonHeader);


export default class HomeTabs extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        {console.log(HomeTabNavigator)}
        <HomeTabNavigator />
      </View>
    );
  }
}
