import React, {Component} from 'react';
import { WebView } from 'react-native-webview'

class checkOut extends Component {
  render() {
    return (
      <WebView
        source={{uri: this.props.navigation.getParam('url')}}
        style={{marginTop: 20}}
      />
    );
  }
}

export default checkOut;