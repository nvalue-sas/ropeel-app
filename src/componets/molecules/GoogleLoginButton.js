import * as React from 'react';
import {StyleSheet} from 'react-native';
import SocialButton from '../atoms/SocialButton';
import {Colors, Typography} from '@styles/index';
import { FONT_FAMILY_BOLD } from '@styles/typography';

export default function GoogleLoginButton() {
  return (
    <SocialButton
      text="Iniciar sesión con Google"
      iconButton="google"
      styleText={styles.styleText}
    />
  );
}

const styles = StyleSheet.create({
  styleText: {
    color: Colors.GOOGLE_GRAY_MAIN,
    fontFamily: FONT_FAMILY_BOLD,
    marginEnd: 26,
  },
});
