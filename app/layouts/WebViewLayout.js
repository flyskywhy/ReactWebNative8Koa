import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Nav from '../components/Nav';

class WebViewLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.navs = {
      Left: {
        onPress: () => props.navigation.goBack(),
      },
      Center: {
        text: props.route.params.text,
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav navs={this.navs} />
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: this.props.route.params.url}}
          javaScriptEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={false}
          domStorageEnabled={true}
          saveFormDataDisabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});

export const LayoutComponent = WebViewLayout;
export function mapStateToProps(state) {
  return {};
}
