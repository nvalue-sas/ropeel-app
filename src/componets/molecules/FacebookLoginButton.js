import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Typography} from '@styles/index';
import {AuthContext} from '../../context';
import { FONT_FAMILY_BOLD } from '@styles/typography';

export default function FacebookLoginButton() {
  const {signInFacebook} = React.useContext(AuthContext);
  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => signInFacebook()}>
      <Image
        source={require('../../assets/images/facebook-logo.png')}
        style={styles.iconButton}
      />
      <Text style={styles.styleText}>Iniciar sesión con Facebook</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderColor: Colors.GRAY_SHADOW_LIGHT,
    borderRadius: 0,
    borderWidth: 0.2,
    borderBottomWidth: 1,
  },
  iconButton: {
    marginStart: 8,
    marginBottom: 8,
    marginTop: 8,
    marginEnd: 24,
    width: 32,
    height: 32,
  },
  styleText: {
    color: Colors.FB_BLUE_MAIN,
    fontFamily: FONT_FAMILY_BOLD,
    marginEnd: 10,
  },
});
