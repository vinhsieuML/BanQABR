
// // import React from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './src/test';
import { Provider } from 'react-redux';
import store from './src/store';

import RootNavigator from './src/navigation/RootNavigator'

// export default () => {
//   // return <RootNavigator />
//   return
//   <Provider store={store}>
//     <Main />
//   </Provider>
// }



export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* <View style={styles.container}> */}
          {/* <Main /> */}
          <RootNavigator />
        {/* </View> */}
      </Provider>
    );
  }
}

