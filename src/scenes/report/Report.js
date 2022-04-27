import * as React from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import UserVehiclesReport from '../user_vehicles/UserVehiclesReport';
import GenericButton from '../../componets/atoms/GenericButton';
import GenericText from '../../componets/atoms/GenericText';
import {TIMES} from '../../constants/RopeelAPI';
import {Picker} from '@react-native-community/picker';
import {Colors} from '@styles/index';

export default function Report({route, navigation}) {
  const {user} = route.params;
  const {latitude} = route.params;
  const {longitude} = route.params;
  const [times, setTimes] = React.useState([]);
  const [time, setTime] = React.useState(null);

  React.useEffect(() => {
    fetch(TIMES, {
      method: 'GET',
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setTimes(apiData.times);
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
  }, []);

  function createVehicle() {
    navigation.navigate('Vehicle', {
      screen: 'VehicleTypes',
      params: {
        vehicleInfo: {
          nvgUser: user,
          nvgVehicleHist: null,
          nvgTypeCode: null,
          nvgSubtypeCode: null,
          nvgSubtypeIcon: null,
          nvgColor: null,
          nvgPlate: null,
          nvgBrandCode: null,
          nvgReferenceId: null,
          nvgModel: null,
        },
      },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require('@images/report.png')} />
        </View>
        <View style={styles.pickerContainer}>
          <GenericText type="h5" text="Ultima vez que vio su vehiculo" />
          <Picker
            selectedValue={time}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setTime(itemValue)}>
            {times.map((l, i) => (
              <Picker.Item
                key={i}
                label={l.name}
                value={l.id}
                color={Colors.TEXT}
              />
            ))}
          </Picker>
        </View>
        <UserVehiclesReport
          user={user}
          latitude={latitude}
          longitude={longitude}
          navigation={navigation}
          time={time}
        />
        <GenericButton
          type="primary"
          title="Crear Vehiculo"
          onPress={() => createVehicle()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
  },
  imgContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  picker: {
    backgroundColor: Colors.GRAY_LIGHT,
    width: 280,
    marginBottom: 10,
  },
});
