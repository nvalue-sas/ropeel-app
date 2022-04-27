import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '@styles/index';

export default function SocialButton(props) {
  const imageIconBtn =
    props.iconButton === 'facebook'
      ? require('../../assets/images/facebook-logo.png')
      : require('../../assets/images/google-logo.png');

  return (
    <TouchableOpacity style={styles.touchableOpacity}>
      <Image source={imageIconBtn} style={styles.iconButton} />
      <Text style={props.styleText}>{props.text}</Text>
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
});
