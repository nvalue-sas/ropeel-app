import * as React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {USR_VEHICLES, VEHICLE_DELETE} from '../../constants/RopeelAPI';
import GenericText from '../../componets/atoms/GenericText';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {validUndefined} from '../../utils/StringUtils';
import {Colors} from '@styles/index';
import Modal from 'react-native-modal';

export default function UserVehicles(props) {
  const {user} = props;
  const {navigation} = props;
  const [reload, setReload] = React.useState(false);
  const [vehicles, setvehicles] = React.useState([]);
  const [vehicleSelect, setVehicleSelect] = React.useState(null);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);

  function editVehicle() {
    setIsVisibleModal(false);
    navigation.navigate('Vehicle', {
      screen: 'VehicleTypes',
      params: {
        vehicleInfo: {
          nvgUser: user,
          nvgVehicleHist: vehicleSelect.vehicleHist,
          nvgTypeCode: vehicleSelect.typeCode,
          nvgSubtypeCode: vehicleSelect.subtypeCode,
          nvgSubtypeIcon: vehicleSelect.subtypeIcon,
          nvgColor: vehicleSelect.color,
          nvgPlate: vehicleSelect.licensePlate,
          nvgBrandCode: vehicleSelect.brand,
          nvgReferenceId: vehicleSelect.referenceId,
          nvgModel: vehicleSelect.model,
        },
      },
    });
  }

  function deleteVehicle() {
    setIsVisibleModal(false);
    fetch(VEHICLE_DELETE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({userVehicle: vehicleSelect.userVehicle}),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setReload(!reload);
        } else {
          Alert.alert('Error', apiData.logMessage, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((errorFetch) => {
        console.error(errorFetch);
      });
  }

  function showModalOptions(vehicle) {
    setIsVisibleModal(true);
    setVehicleSelect(vehicle);
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
  }, [user, reload]);

  return (
    <View style={styles.vehicles}>
      {typeof vehicles !== 'undefined' && vehicles.length > 0 ? (
        <GenericText type="h5" text="Mis vehiculos" />
      ) : null}
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
            chevron={{
              color: Colors.TEXT,
            }}
            onPress={() => showModalOptions(l)}
            bottomDivider
          />
        ))}
      </View>
      <Modal
        style={styles.modalVehicleOptions}
        isVisible={isVisibleModal}
        onBackdropPress={() => setIsVisibleModal(false)}>
        <View style={styles.viewVehicleOptions}>
          <ListItem
            title={<GenericText type="h5" text="Editar vehiculo" />}
            leftIcon={<IconAnt name="edit" color={Colors.TEXT} size={24} />}
            onPress={() => editVehicle()}
          />
          <ListItem
            title={<GenericText type="h5" text="Eliminar vehiculo" />}
            leftIcon={
              <IconAnt name="delete" size={24} color={Colors.PRIMARY} />
            }
            onPress={() =>
              Alert.alert(
                'Eliminar vehiculo',
                '¿Esta seguro de eliminar este vehiculo?',
                [
                  {text: 'Cancelar'},
                  {text: 'OK', onPress: () => deleteVehicle()},
                ],
                {
                  cancelable: false,
                },
              )
            }
          />
        </View>
      </Modal>
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
  modalVehicleOptions: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewVehicleOptions: {
    backgroundColor: Colors.WHITE,
    height: 150,
    justifyContent: 'center',
    padding: 10,
  },
});
