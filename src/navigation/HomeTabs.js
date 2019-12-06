import React, { Component } from 'react';
import { BottomTabBar, createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Icon, Text, } from 'react-native-elements';
import store from '../store'
import { connect } from 'react-redux'
import * as actions from '../actions';

import Home from '../screens/Main/Shop/Home/Home'
import Contact from '../screens/Main/Shop/Contact/Contact'
import Cart from '../screens/Main/Shop/Cart/Cart'
import Search from '../screens/Main/Shop/Search/Search'
import { View } from 'react-native';
// import Header from '../screens/Main/Shop/Header'
// import withBadge from '../navigation/withBadge'

const TabBarComponent = props => <BottomTabBar {...props} />;

// const BadgedIcon = withBadge(0)(Icon);
import getToken from '../api/getToken'
import checkLogin from '../api/checkLogin'
function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}


function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  const state = store.getState();
  const badgeValue = state.counter.Cart.map(e => e.quantity);
  const total = badgeValue.length ? badgeValue.reduce((a, b) => a + b) : 0;
  return <IconWithBadge {...props} badgeCount={total} />;
}


const HomeTabsnonHeader = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      path: '/buttons',
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Home',
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
          <HomeIconWithBadge
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
    unmountInactiveRoutes: true,
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


class HomeTabs extends Component {
  componentDidMount() {
    getToken()
      .then(token => {
        if (token !== '') {
          checkLogin(token).then(res => {
            this.props.setUser(res.user)
          });
        }
      })
      .catch(err => console.log('LOI CHECK LOGIN', err));
    this.props.initCart();
    this.props.initDrawer(this.props.navigation);
  }

  render() {
    const badgeValue = this.props.cart.Cart.map(e => e.quantity);
    return (
      <View style={{ flex: 1 }}>
        <HomeTabNavigator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.counter
});
export default connect(mapStateToProps, actions)(HomeTabs);