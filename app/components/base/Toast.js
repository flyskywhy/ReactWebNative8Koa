import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, Animated, Modal} from 'react-native';
import PropTypes from 'prop-types';

const defaultText = 'Toast';
const defaultTimeout = 2000;

class Toast extends Component {
  static propTypes = {
    duration: PropTypes.number,
  };

  static defaultProps = {
    duration: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0.4),
      show: false,
      text: defaultText,
      timeout: defaultTimeout,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  show(text = defaultText, timeout = defaultTimeout) {
    clearTimeout(this.timeout);
    const {duration} = this.props;
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();

    this.setState({
      show: true,
      text,
      timeout,
    });

    this.timeout = setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }).start(() => {
        this.setState({
          show: false,
        });
      });
    }, timeout - duration);
  }

  render() {
    const {height, width} = Dimensions.get('window');
    const toastWidth = width * 0.7;
    const opacity = {
      opacity: this.state.fadeAnim,
    };
    if (!this.state.show) {
      return null;
    }
    return (
      <Modal
        animationType={'slide'}
        visible={true}
        transparent={true}
        onRequestClose={() => {}}>
        <Animated.View
          style={[
            styles.container,
            {
              width: toastWidth,
              left: (width - toastWidth) / 2,
              top: (height - 60) / 2,
            },
            this.props.style,
            opacity,
          ]}>
          <Text style={styles.text}>{this.state.text}</Text>
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 16 * 1.5,
  },
});

export default Toast;
