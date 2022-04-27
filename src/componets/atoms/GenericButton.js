import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import GenericText from '../atoms/GenericText';
import {Colors} from '@styles/index';

function getButtonStyle(type) {
  if (type === 'primary') {
    return styles.primary;
  } else if (type === 'secondary') {
    return styles.secondary;
  }
}

function getTextStyle(type) {
  if (type === 'primary') {
    return styles.primaryText;
  } else if (type === 'secondary') {
    return styles.secondaryText;
  }
}

export default function GenericButton(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
      <View style={[styles.button, props.style, getButtonStyle(props.type)]}>
        <GenericText
          type="h5"
          text={props.title}
          style={[getTextStyle(props.type)]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  primary: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY_RGBA,
    borderBottomColor: Colors.GRAY_SHADOW_LIGHT,
  },
  secondary: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    borderBottomColor: Colors.GRAY_SHADOW_LIGHT,
  },
  primaryText: {
    color: Colors.WHITE,
  },
  secondaryText: {
    color: Colors.TEXT,
  },
});
