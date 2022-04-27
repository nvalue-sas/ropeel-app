import * as React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Colors, Typography} from '@styles/index';
import {AuthContext} from '../../context';
import { FONT_FAMILY_BOLD } from '@styles/typography';

export default function FacebookLogoutButton() {
  const {signOutFacebook} = React.useContext(AuthContext);
  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => signOutFacebook()}>
      <View style={styles.logoutButtonBody}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoutButtonBody: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
    borderRadius: 0,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 10,
    textAlign: 'center',
    width: 300,
  },
  logoutButtonText: {
    color: Colors.WHITE,
    fontFamily: FONT_FAMILY_BOLD,
  },
});
