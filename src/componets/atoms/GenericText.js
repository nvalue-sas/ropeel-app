import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '@styles/index';

function getStyleText(type) {
  if (type === 'h1') {
    return styles.h1;
  } else if (type === 'h2') {
    return styles.h2;
  } else if (type === 'h3') {
    return styles.h3;
  } else if (type === 'h4') {
    return styles.h4;
  } else if (type === 'h5') {
    return styles.h5;
  } else if (type === 'h6') {
    return styles.h6;
  } else if (type === 'p') {
    return styles.p;
  }
}

export default function GenericText(props) {
  return (
    <Text style={[getStyleText(props.type), props.style]}>{props.text}</Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 32,
  },
  h2: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 24,
  },
  h3: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 18,
  },
  h4: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 16,
  },
  h5: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 13.28,
  },
  h6: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 10.72,
  },
  p: {
    color: Colors.TEXT,
    fontFamily: Typography.FONT_FAMILY_BOOK,
    fontSize: 10.72,
  },
});
