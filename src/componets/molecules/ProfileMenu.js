import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Menu, {MenuItem} from 'react-native-material-menu';

export default function ProfileMenu() {
  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  return (
    <View style={styles.container}>
      <Menu
        ref={menu}
        button={<IconAnt name="setting" size={24} onPress={showMenu} />}>
        <MenuItem onPress={hideMenu}>Cambiar avatar</MenuItem>
        <MenuItem onPress={hideMenu}>Modificar Alias</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 15,
  },
});
