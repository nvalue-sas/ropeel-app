import * as React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Overlay} from 'react-native-elements';
import {ColorPicker} from 'react-native-color-picker';
import GenericText from '../../componets/atoms/GenericText';
import GenericButton from '../../componets/atoms/GenericButton';
import {VEHICLE_SAVE} from '../../constants/RopeelAPI';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {validValue} from '../../utils/StringUtils';
import {Colors} from '@styles/index';

const vehicleColors = [
  {
    colorLabel: 'Blanco',
    border: '#EEEEEE',
    color: '#FAFAFA',
  },
  {
    colorLabel: 'Plateado',
    border: '#CFD8DC',
    color: '#B0BEC5',
  },
  {
    colorLabel: 'Negro',
    border: '#616161',
    color: '#424242',
  },
  {
    colorLabel: 'Rojo',
    border: '#E57373',
    color: '#EF5350',
  },
  {
    colorLabel: 'Amarillo',
    border: '#FFF176',
    color: '#FDD835',
  },
  {
    colorLabel: 'Verde',
    border: '#A5D6A7',
    color: '#66BB6A',
  },
  {
    colorLabel: 'Azul',
    border: '#90CAF9',
    color: '#42A5F5',
  },
];

export default function VehicleInfo({route, navigation}) {
  const {vehicleInfo} = route.params;
  const [vehicleColor, setVehicleColor] = React.useState('#424242');
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [licensePlate, setLicensePlate] = React.useState(null);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  function changeColor(item) {
    setVehicleColor(item.color);
    getIconBackground();
  }

  function pickerColorSelect(colorSelect) {
    setVehicleColor(colorSelect);
    getIconBackground();
    toggleOverlay();
  }

  function getIconBackground() {
    if (vehicleColor === '#FAFAFA') {
      return styles.iconBackground;
    } else {
      return null;
    }
  }

  function setMoreInfo() {
    let message;
    if (licensePlate === null || licensePlate.length === 0) {
      message = 'El campo de placa del vehiculo es obligatorio';
    } else if (licensePlate.length < 6) {
      message = 'El número minimo permitido de digitos para la placa es de 6';
    }
    if (message != null) {
      Alert.alert('Precaución', message, [{text: 'OK'}], {cancelable: false});
    } else {
      navigation.navigate('VehicleBrands', {
        vehicleInfo: {
          nvgUser: vehicleInfo.nvgUser,
          nvgVehicleHist: vehicleInfo.nvgVehicleHist,
          nvgTypeCode: vehicleInfo.nvgTypeCode,
          nvgSubtypeCode: vehicleInfo.nvgSubtypeCode,
          nvgSubtypeIcon: vehicleInfo.nvgSubtypeIcon,
          nvgColor: vehicleColor,
          nvgPlate: licensePlate,
          nvgBrandCode: vehicleInfo.nvgBrandCode,
          nvgReferenceId: vehicleInfo.nvgReferenceId,
          nvgModel: vehicleInfo.nvgModel,
        },
      });
    }
  }

  function saveVehicle() {
    let message = null;
    if (licensePlate === null || licensePlate.length === 0) {
      message = 'El campo de placa del vehiculo es obligatorio';
    } else if (licensePlate.length < 6) {
      message = 'El numero minimo permitido de digitos para la placa es de 6';
    }
    if (message != null) {
      Alert.alert('Precaución', message, [{text: 'OK'}], {cancelable: false});
    } else {
      console.log(
        'vehicleInfo.nvgReferenceId =: ' +
          validValue(vehicleInfo.nvgReferenceId, 0),
      );
      let request = {
        user: vehicleInfo.nvgUser,
        vehicle: validValue(vehicleInfo.nvgVehicleHist, 0),
        subtypeCode: vehicleInfo.nvgSubtypeCode,
        color: vehicleColor,
        licencePlate: licensePlate,
        brand: validValue(vehicleInfo.nvgBrandCode, 'undefined'),
        reference: validValue(vehicleInfo.nvgReferenceId, 0),
        newReference: 'undefined',
        model: validValue(vehicleInfo.nvgModel, 'undefined'),
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
    if (vehicleInfo.nvgColor !== null) {
      setVehicleColor(vehicleInfo.nvgColor);
    }
    if (vehicleInfo.nvgPlate !== null) {
      setLicensePlate(vehicleInfo.nvgPlate);
    }
  }, [vehicleInfo.nvgColor, vehicleInfo.nvgPlate]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.title}>
          <GenericText
            type="h4"
            text="Seleccione el color y placa de su vehiculo"
          />
        </View>
        <View style={styles.colorsContainer}>
          {vehicleColors.map((l, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                changeColor(l);
              }}>
              <View style={styles.colorBody}>
                <View
                  style={[
                    styles.color,
                    {
                      backgroundColor: l.color,
                      borderTopColor: l.border,
                      borderColor: l.border,
                    },
                  ]}
                />
                <GenericText type="p" text={l.colorLabel} />
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => toggleOverlay()}>
            <View style={styles.colorBody}>
              <Image
                source={require('@assets/images/picker.png')}
                style={styles.picker}
              />
              <GenericText type="p" text="Otro" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={licensePlate}
            inputContainerStyle={styles.inputCont}
            inputStyle={styles.input}
            placeholder="Ingrese su placa"
            leftIcon={
              <Icon
                name={vehicleInfo.nvgSubtypeIcon}
                color={vehicleColor}
                size={24}
              />
            }
            leftIconContainerStyle={[styles.inputIcon, getIconBackground()]}
            onChangeText={(value) => setLicensePlate(value)}
          />
        </View>
        <GenericButton
          type="secondary"
          title="Agragar más caracteristicas"
          onPress={() => setMoreInfo()}
          style={styles.btn}
        />
        <GenericButton
          type="primary"
          title="Guardar"
          onPress={() => saveVehicle()}
        />
        <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
          <View style={styles.pickerContainer}>
            <GenericText type="h5" text="Seleccione un color" />
            <ColorPicker
              defaultColor={Colors.PRIMARY}
              onColorSelected={(cps) => pickerColorSelect(cps)}
              style={styles.colorPicker}
            />
          </View>
        </Overlay>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: Colors.GRAY_LIGHT,
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
  colorsContainer: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50,
    width: 250,
  },
  colorBody: {
    alignItems: 'center',
  },
  color: {
    borderWidth: 1,
    borderTopWidth: 15,
    height: 50,
    margin: 5,
    width: 50,
    borderRadius: 25,
  },
  btn: {
    marginBottom: 10,
  },
  picker: {
    margin: 5,
    height: 50,
    width: 50,
  },
  pickerContainer: {
    alignItems: 'center',
    height: 300,
    justifyContent: 'center',
    padding: 10,
    width: 250,
  },
  colorPicker: {
    height: 256,
    margin: 10,
    width: 256,
  },
  iconContainer: {
    padding: 10,
    marginBottom: 30,
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
  vehicleTypeActive: {
    backgroundColor: Colors.PRIMARY_RGBA,
    height: 200,
    width: 200,
    position: 'absolute',
  },
  img: {
    height: 150,
    marginBottom: 10,
    width: 150,
  },
  inputContainer: {
    width: 280,
  },
  inputCont: {
    backgroundColor: Colors.GRAY_RGBA,
    borderColor: Colors.GRAY_SHADOW_LIGHT,
  },
  input: {
    marginRight: 50,
    textAlign: 'center',
    color: Colors.TEXT,
  },
  inputIcon: {
    width: 50,
  },
  iconBackground: {
    backgroundColor: Colors.TEXT,
  },
});
