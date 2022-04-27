import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '@styles/index';
import AppIntroSlider from 'react-native-app-intro-slider';
import slides from '../../componets/atoms/SlidesIntro';

const styles = StyleSheet.create({
  activeDotStyle: {
    backgroundColor: Colors.PRIMARY,
  },
});

export default function IntroSlider() {
  return (
    <AppIntroSlider
      slides={slides}
      activeDotStyle={styles.activeDotStyle}
      showNextButton={false}
      showDoneButton={false}
    />
  );
}
