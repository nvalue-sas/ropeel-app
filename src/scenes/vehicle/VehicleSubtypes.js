import * as React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {VEHICLE_SUBTYPES} from '../../constants/RopeelAPI';
import GenericText from '../../componets/atoms/GenericText';
import {Colors} from '@styles/index';

export default function VehicleSubtypes({route, navigation}) {
  const {vehicleInfo} = route.params;
  const [vehicleSubtypes, setVehicleSubtypes] = React.useState([]);
  const [vehicleSubtypeCode, setVehicleSubtypeCode] = React.useState(null);

  function selectVehiculeSubtype(item) {
    setVehicleSubtypeCode(item.code);
    navigation.navigate('VehicleBasicInfo', {
      vehicleInfo: {
        nvgUser: vehicleInfo.nvgUser,
        nvgVehicleHist: vehicleInfo.nvgVehicleHist,
        nvgTypeCode: vehicleInfo.nvgTypeCode,
        nvgSubtypeCode: item.code,
        nvgSubtypeIcon: item.icon,
        nvgColor: vehicleInfo.nvgColor,
        nvgPlate: vehicleInfo.nvgPlate,
        nvgBrandCode: vehicleInfo.nvgBrandCode,
        nvgReferenceId: vehicleInfo.nvgReferenceId,
        nvgModel: vehicleInfo.nvgModel,
      },
    });
  }

  React.useEffect(() => {
    fetch(VEHICLE_SUBTYPES, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type: vehicleInfo.nvgTypeCode,
      }),
    })
      .then(apiResponse => apiResponse.json())
      .then(apiData => {
        if (apiData.logType === 'success') {
          setVehicleSubtypes(apiData.vehicleSubtypes);
          if (vehicleInfo.nvgSubtypeCode !== null) {
            setVehicleSubtypeCode(vehicleInfo.nvgSubtypeCode);
          }
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch(errorFetch => {
        Alert.alert('Error', errorFetch.toString(), [{text: 'OK'}], {
          cancelable: false,
        });
        console.error(errorFetch);
      });
  }, [vehicleInfo.nvgTypeCode, vehicleInfo.nvgSubtypeCode]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.title}>
          <GenericText type="h4" text="Tipo de vehiculo" />
        </View>
        <View style={styles.content}>
          <View style={styles.body}>
            {vehicleSubtypes.map((l, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  selectVehiculeSubtype(l);
                }}>
                <View
                  style={[
                    styles.vehicleSubtype,
                    l.code === vehicleSubtypeCode
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
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  vehicleSubtype: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    height: 140,
    justifyContent: 'center',
    margin: 10,
    position: 'relative',
    width: 140,
  },
  img: {
    height: 90,
    marginBottom: 10,
    width: 90,
  },
  button: {},
  buttonPress: {
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    backgroundColor: Colors.GRAY_RGBA,
  },
});
