import * as React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {REF_BRANDS, VEHICLE_SAVE} from '../../constants/RopeelAPI';
import GenericText from '../../componets/atoms/GenericText';
import GenericButton from '../../componets/atoms/GenericButton';
import {validValue} from '../../utils/StringUtils';
import {Colors} from '@styles/index';

export default function VehicleAditionalInfo({route, navigation}) {
  const {vehicleInfo} = route.params;
  const [model, setModel] = React.useState(null);
  const [brandReferences, setBrandReferences] = React.useState([]);
  const [reference, setReference] = React.useState(null);
  const [newReference, setNewReference] = React.useState(null);
  const [isOtherRef, setIsOtherRef] = React.useState(true);

  function changeReference(ref) {
    setReference(ref);
    if (ref === '_OBR_') {
      setIsOtherRef(false);
    } else {
      setNewReference(null);
      setIsOtherRef(true);
    }
  }

  function saveVehicle() {
    let message = null;
    if (reference === null || reference.length === 0) {
      message = 'La referencia del vehiculo es obligatoria';
    } else if (
      reference === '_OBR_' &&
      (newReference === null || newReference.length === 0)
    ) {
      message = 'El campo de otra referencia es obligatorio';
    } else if (model === null || model.length < 4) {
      message = 'El modelo es obligatorio, minimo 4 digitos';
    }
    if (message !== null) {
      Alert.alert('Precaución', message, [{text: 'OK'}], {cancelable: false});
    } else {
      console.log(reference);
      let request = {
        user: vehicleInfo.nvgUser,
        vehicle: validValue(vehicleInfo.nvgVehicleHist, 0),
        subtypeCode: vehicleInfo.nvgSubtypeCode,
        color: vehicleInfo.nvgColor,
        licencePlate: vehicleInfo.nvgPlate,
        brand: validValue(vehicleInfo.nvgBrandCode, 'undefined'),
        reference: reference !== '_OBR_' ? reference : 0,
        newReference: validValue(newReference, 'undefined'),
        model: model,
      };
      fetch(VEHICLE_SAVE, {
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
            navigation.reset({
              index: 0,
              routes: [{name: 'Profile'}],
            });
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
  }

  React.useEffect(() => {
    fetch(REF_BRANDS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({brand: vehicleInfo.nvgBrandCode}),
    })
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        if (apiData.logType === 'success') {
          setBrandReferences(apiData.brandRefereces);
          if (validValue(vehicleInfo.nvgModel, null) !== null) {
            setModel(vehicleInfo.nvgModel.toString());
          }
          if (vehicleInfo.nvgReferenceId !== null) {
            setReference(vehicleInfo.nvgReferenceId);
          }
          if (apiData.brandRefereces.length === 0) {
            changeReference('_OBR_');
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
  }, [vehicleInfo]);

  return (
    <View style={styles.container}>
      <GenericText type="h4" text="Información adicional" />
      <View style={styles.form}>
        <GenericText type="h6" text="Referencia" />
        <Picker
          selectedValue={reference}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => changeReference(itemValue)}>
          {brandReferences.map((l, i) => (
            <Picker.Item key={i} label={l.name} value={l.id} />
          ))}
          <Picker.Item label="Otra" value="_OBR_" />
        </Picker>
        <GenericText type="h6" text="Otra referencia" />
        <Input
          value={newReference}
          disabled={isOtherRef}
          placeholder="otra ¿cual?"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={(value) => setNewReference(value)}
        />
        <GenericText type="h6" text="Modelo" />
        <Input
          value={model}
          keyboardType="numeric"
          placeholder="modelo..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={(value) => setModel(value)}
        />
        <GenericButton
          type="primary"
          title="Terminar"
          onPress={() => saveVehicle()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY_LIGHT,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    height: 300,
    alignItems: 'center',
    //backgroundColor: 'red',
    marginTop: 30,
  },
  inputContainer: {
    backgroundColor: Colors.GRAY_RGBA,
    width: 280,
    borderColor: Colors.GRAY_SHADOW_LIGHT,
    margin: 0,
  },
  input: {
    color: Colors.TEXT,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: Colors.GRAY_RGBA,
    width: 280,
    marginBottom: 10,
  },
});
