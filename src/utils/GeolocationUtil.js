import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const hasLocationPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('No fue posible abrir la configuración');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');
  if (status === 'granted') {
    return true;
  }
  if (status === 'denied') {
    Alert.alert('Permisos de ubicacion denegado');
  }
  if (status === 'disabled') {
    Alert.alert(
      'Active los servicios de ubicacion para permitir a ROPEEL funcionar correctamente',
      '',
      [
        {text: 'Ir a la configuracion', onPress: openSetting},
        {text: 'No usar el servicio de geolocalizacion', onPress: () => {}},
      ],
    );
  }
  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasLocationPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Permiso de ubicación denegados por el usuario.',
      ToastAndroid.LONG,
    );
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Permiso de ubicación revocado por el usuario.',
      ToastAndroid.LONG,
    );
  }
  return false;
};

export default hasLocationPermission;
