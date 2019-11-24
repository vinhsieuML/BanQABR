import React, { Component } from 'react';
import { View, Image, Dimensions, SafeAreaView,Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { Icon, colors } from 'react-native-elements';

import HomeNavigator from './HomeNavigator';



const WINDOW_WIDTH = Dimensions.get('window').width;


const customContentComponent = props => (
  
  <SafeAreaView
    style={{ flex: 1, height: '100%', backgroundColor: 'black' }}z
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
        source={require('../images/logo.png')}
        style={{ width: '70%' }}
        resizeMode="contain"
      />
      <Text style={{color: 'red'}}>
        Sieu Dang
      </Text>
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
    },
    // Các màn hình còn lại (không có thêm stack)
    // Body: {
    //   screen: loginJSX,
    // }
    // ChangeInfo:{

    // },
    // ShippingAddress:{

    // },
    // SignOut:{

    // }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      backgroundColor: '#43484d',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    contentComponent: customContentComponent,
  }
);


export default DrawerNavigator;