import React, { Component } from 'react';
import { View, Image, Dimensions, SafeAreaView, Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { Icon, colors } from 'react-native-elements';

import HomeNavigator from './HomeNavigator';
import ChangeInfo from '../screens/ChangeInfo/ChangeInfo'
import OrderHistory from '../screens/OrderHistory/OrderHistory'
import Authentication from '../screens/Authentication/Authentication'
import { hidden } from 'ansi-colors';
const WINDOW_WIDTH = Dimensions.get('window').width;


const customContentComponent = props => (

  <SafeAreaView
    style={{ flex: 1, height: '100%', backgroundColor: 'white' }} 
    forceInset={{ top: 'always', horizontal: 'never' }}
  >
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../imgs/logo.png')}
        style={{ width: '70%' }}
        resizeMode="contain"
      />
    </View>


    <View style={{ marginLeft: 10 }}>
      <DrawerNavigatorItems {...props} />
    </View>
  </SafeAreaView>
);



const DrawerNavigator = createDrawerNavigator(
  {
    //Stack của màn hình chính
    Home: {
      path: '/home',
      screen: HomeNavigator,
      navigationOptions:{
        // drawerLockMode: 'locked-closed',
      }
    },
    ChangeInfo: {
      path: '/changeinfo',
      screen: ChangeInfo,
      navigationOptions: {
        title: 'Thay đổi thông tin',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info"
            size={30}
            iconStyle={{
              width: 30,
              height: 30,
            }}
            type="material"
            color={tintColor}
          />
        ),
      },
    },
    OrderHistory: {
      path: '/orderhistory',
      screen: OrderHistory,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
        title: 'Lịch sử mua hàng',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="history"
            size={30}
            iconStyle={{
              width: 30,
              height: 30,
            }}
            type="material"
            color={tintColor}
          />
        ),
      },
    },
    Authentication: {
      path:'/Authentication',
      screen: Authentication,
      navigationOptions:{
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="account-circle"
            size={30}
            iconStyle={{
              width: 30,
              height: 30,
            }}
            type="material"
            color={tintColor}
          />
        ),
        drawerLockMode: 'locked-closed',
        drawerLabel: 'Đăng Nhập / Đăng Xuất'
      }
    }

  },
  {
    initialRouteName: 'Home',
    unmountInactiveRoutes: true,
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: 'black',
      inactiveBackgroundColor: 'transparent',
      backgroundColor: '#43484d',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    backBehavior:"initialRoute",
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    contentComponent: customContentComponent,
  }
);


export default DrawerNavigator;