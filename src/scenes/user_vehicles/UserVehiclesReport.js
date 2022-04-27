import * as React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {USR_VEHICLES, SAVE_REPORT} from '../../constants/RopeelAPI';
import GenericText from '../../componets/atoms/GenericText';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {validUndefined} from '../../utils/StringUtils';

export default function UserVehiclesReports(props) {
  const {user} = props;
  const {latitude} = props;
  const {longitude} = props;
  const {navigation} = props;
  const {time} = props;
  const [vehicles, setvehicles] = React.useState([]);

  function reportVehicle(vehicle) {
    let request = {
      user: user,
      vehicle: vehicle.vehicleHist,
      time: time,
      lat: latitude,
      long: longitude,
    };
    fetch(SAVE_REPORT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          navigation.goBack();
          navigation.navigate('UserReports');
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        Alert.alert('Error', errorFetch.toString(), [{text: 'OK'}], {
          cancelable: false,
        });
        console.error(errorFetch);
      });
  }

  function confirmReport(vehicle) {
    Alert.alert(
      vehicle.subtypeName + ' ' + vehicle.licensePlate,
      '¿Esta seguro de reportar este vehiculo como robado?',
      [{text: 'Cancelar'}, {text: 'OK', onPress: () => reportVehicle(vehicle)}],
      {
        cancelable: false,
      },
    );
  }

  React.useEffect(() => {
    fetch(USR_VEHICLES, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({user: user}),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setvehicles(apiData.vehicles);
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
  }, [user]);

  return (
    <View style={styles.vehicles}>
      {typeof vehicles !== 'undefined' && vehicles.length > 0 ? (
        <GenericText type="h5" text="Seleccione el vehiculo a reportar" />
      ) : (
        <GenericText type="h5" text="No tienes vehiculos creados" />
      )}
      <View style={styles.vehiclesBody}>
        {vehicles.map((l, i) => (
          <ListItem
            key={i}
            title={<GenericText type="h5" text={l.licensePlate} />}
            subtitle={
              <GenericText
                type="p"
                text={validUndefined(
                  [l.subtypeName, l.brand, l.referenceName, l.model],
                  ' ',
                )}
              />
            }
            leftIcon={<Icon name={l.subtypeIcon} color={l.color} size={24} />}
            onPress={() => confirmReport(l)}
            bottomDivider
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vehicles: {
    padding: 10,
  },
  vehiclesBody: {
    marginTop: 5,
    marginBottom: 20,
  },
});
