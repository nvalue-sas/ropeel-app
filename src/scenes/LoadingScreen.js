import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/index';

export default function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <View style={styles.imageContainer}>
        <Image source={require('@images/ropeel.png')} style={styles.image} />
      </View>
      <View style={styles.fromContainer}>
        <Text style={styles.from}>From</Text>
        <Text style={styles.corp}>NVALUE S.A.S</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    backgroundColor: Colors.GRAY_MEDIUM,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 128,
    width: 128,
  },
  fromContainer: {
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  from: {
    marginTop: 20,
    fontSize: 18,
    color: Colors.GRAY_DARK,
    fontWeight: '600',
  },
  corp: {
    fontSize: 20,
    color: Colors.NV_BLUE_MAIN,
    fontWeight: '600',
  },
});
