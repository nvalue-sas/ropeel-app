import * as React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import GenericText from '../../componets/atoms/GenericText';

export default function MessagesView() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@images/empty_message.png')}
        style={styles.emptyImage}
      />
      <GenericText type="h4" text="Sin mensajes" style={styles.emptyText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 128,
    height: 128,
    marginBottom: 30,
  },
  emptyText: {
    color: '#454545',
  },
});
