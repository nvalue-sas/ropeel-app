import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '@styles/index';
import AppIntroSlider from '../../componets/molecules/AppIntroSlider';
import FacebookLoginButton from '../../componets/molecules/FacebookLoginButton';
import GoogleLoginButton from '../../componets/molecules/GoogleLoginButton';

export default function LoginView({navigation}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.sliderContainer}>
        <AppIntroSlider />
      </View>
      <View style={styles.loginContainer}>
        <FacebookLoginButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'stretch',
    backgroundColor: Colors.GRAY_LIGHT,
    flex: 1,
  },
  sliderContainer: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
