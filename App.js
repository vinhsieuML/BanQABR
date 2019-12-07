
// // import React from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import RootNavigator from './src/navigation/RootNavigator'
import {Root} from 'popup-ui'


export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </Root>
    );
  }
}
