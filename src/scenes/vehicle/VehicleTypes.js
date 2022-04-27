import * as React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {VEHICLE_TYPES} from '../../constants/RopeelAPI';
import GenericText from '../../componets/atoms/GenericText';
import {Colors} from '@styles/index';

export default function VehicleTypes({route, navigation}) {
  const {vehicleInfo} = route.params;
  const [vehicleTypes, setVehicleTypes] = React.useState([]);
  const [vehicleTypeCode, setVehicleTypeCode] = React.useState(null);

  function selectVehiculeType(item) {
    setVehicleTypeCode(item.code);
    let stackNavigate;
    let subtypeCode;
    let subtypeIcon;
    if (item.code === 'MOT') {
      stackNavigate = 'VehicleBasicInfo';
      subtypeCode =
        vehicleInfo.nvgSubtypeCode === null
          ? 'MOT'
          : vehicleInfo.nvgSubtypeCode;
      subtypeIcon =
        vehicleInfo.nvgSubtypeIcon === null
          ? 'motorcycle'
          : vehicleInfo.nvgSubtypeIcon;
    } else {
      stackNavigate = 'VehicleSubypes';
      subtypeCode = vehicleInfo.nvgSubtypeCode;
      subtypeIcon = vehicleInfo.nvgSubtypeIcon;
    }
    navigation.navigate(stackNavigate, {
      vehicleInfo: {
        nvgUser: vehicleInfo.nvgUser,
        nvgVehicleHist: vehicleInfo.nvgVehicleHist,
        nvgTypeCode: item.code,
        nvgSubtypeCode: subtypeCode,
        nvgSubtypeIcon: subtypeIcon,
        nvgColor: vehicleInfo.nvgColor,
        nvgPlate: vehicleInfo.nvgPlate,
        nvgBrandCode: vehicleInfo.nvgBrandCode,
        nvgReferenceId: vehicleInfo.nvgReferenceId,
        nvgModel: vehicleInfo.nvgModel,
      },
    });
  }

  React.useEffect(() => {
    fetch(VEHICLE_TYPES, {
      method: 'GET',
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setVehicleTypes(apiData.vehicleTypes);
          if (vehicleInfo.nvgTypeCode !== null) {
            setVehicleTypeCode(vehicleInfo.nvgTypeCode);
          }
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
  }, [vehicleInfo.nvgTypeCode]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.title}>
          <GenericText type="h4" text="Tipo de vehiculo" />
        </View>
        <View style={styles.body}>
          {vehicleTypes.map((l, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                selectVehiculeType(l);
              }}>
              <View
                style={[
                  styles.vehicleType,
                  l.code === vehicleTypeCode
                    ? styles.buttonPress
                    : styles.button,
                ]}>
                <Image source={{uri: l.image}} style={styles.img} />
                <GenericText type="h5" text={l.name} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: Colors.GRAY_LIGHT,
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
  },
  body: {
    alignItems: 'center',
  },
  vehicleType: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    height: 200,
    justifyContent: 'center',
    margin: 10,
    position: 'relative',
    width: 200,
  },
  img: {
    height: 150,
    marginBottom: 10,
    width: 150,
  },
  button: {},
  buttonPress: {
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    backgroundColor: Colors.GRAY_RGBA,
  },
});
