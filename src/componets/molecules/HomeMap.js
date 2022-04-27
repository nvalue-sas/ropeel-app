import * as React from 'react';
import {ActivityIndicator, Alert, Image, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '@styles/index';
import GenericText from '../atoms/GenericText';
import GenericButton from '../../componets/atoms/GenericButton';
import Modal from 'react-native-modal';
import {USR_INFO, ZONE_CASES} from '../../constants/RopeelAPI';
import {validUndefined} from '../../utils/StringUtils';

const mapSilverStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

export default function HomeMap(props) {
  const navigation = props.navigation;
  const user = props.user;
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [reportCases, setReportCases] = React.useState([]);
  const [caseTheftSelect, setCaseTheftSelect] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);

  function showTheftInfo(info) {
    setIsVisibleModal(true);
    setCaseTheftSelect(info);
    console.log(info);
  }

  const geolocationState = props.location;
  const LatLng = {
    latitude: geolocationState.latitude,
    longitude: geolocationState.longitude,
  };

  function usertrack() {
    setIsVisibleModal(false);
    navigation.navigate('UserTrack', {
      location: LatLng,
      user: user,
      id: caseTheftSelect.id,
    });
  }

  React.useEffect(() => {
    if (LatLng.latitude) {
      fetch(ZONE_CASES, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          lat: LatLng.latitude === null ? 0 : LatLng.latitude,
          lang: LatLng.longitude === null ? 0 : LatLng.longitude,
        }),
      })
        .then((apiResponse) => apiResponse.json())
        .then((apiData) => {
          if (apiData.logType === 'success') {
            setReportCases(apiData.cases);
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
  }, [LatLng, geolocationState, user]);

  React.useEffect(() => {
    fetch(USR_INFO, {
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
          setAvatar(apiData.avatar);
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

  return (
    <View style={styles.container}>
      {geolocationState.latitude === null ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: geolocationState.latitude,
            longitude: geolocationState.longitude,
            latitudeDelta: geolocationState.latitudeDelta,
            longitudeDelta: geolocationState.longitudeDelta,
          }}
          style={styles.map}
          customMapStyle={mapSilverStyle}>
          <Marker
            coordinate={{
              latitude: geolocationState.latitude,
              longitude: geolocationState.longitude,
            }}>
            <Avatar
              source={{
                uri: avatar,
              }}
              size="medium"
              rounded
            />
          </Marker>
          {reportCases.map((l, i) => (
            <Marker
              key={i}
              coordinate={{latitude: l.latitude, longitude: l.longitude}}
              onPress={() => showTheftInfo(l)}>
              <Image
                source={require('../../assets/images/pin-1.png')}
                style={styles.imgCase}
              />
            </Marker>
          ))}
          <Circle
            center={LatLng}
            radius={1500}
            strokeColor={Colors.PRIMARY_RGBA}
            fillColor={Colors.PRIMARY_RGBA2}
          />
        </MapView>
      )}
      <Modal
        style={styles.modalTheftInfo}
        isVisible={isVisibleModal}
        onBackdropPress={() => setIsVisibleModal(false)}>
        <View style={styles.viewTheftInfo}>
          <View style={styles.calloutViewTitle}>
            <GenericText type="h4" text="REPORTE DE ROBO " />
            <GenericText type="h4" text="ACTIVO" style={styles.active} />
          </View>
          {caseTheftSelect ? (
            <View style={styles.case}>
              <Icon name="car" color={caseTheftSelect.vehicleColor} size={48} />
              <View style={styles.caseInfo}>
                <GenericText type="h2" text={caseTheftSelect.vehiclePlate} />
                <GenericText
                  type="p"
                  text={validUndefined(
                    [
                      caseTheftSelect.vehicleType,
                      caseTheftSelect.vehicleSubtype,
                      caseTheftSelect.vehicleBrand,
                      caseTheftSelect.vehicleModel,
                    ],
                    ' ',
                  )}
                />
              </View>
            </View>
          ) : (
            <View />
          )}

          <GenericButton
            type="primary"
            title="¡LO HE VISTO!"
            onPress={() => usertrack()}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  calloutView: {
    alignItems: 'center',
    height: 80,
    padding: 10,
    width: 150,
  },
  calloutViewTitle: {
    flexDirection: 'row',
  },
  active: {
    color: Colors.SUCCESS,
  },
  case: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 30,
    marginTop: 30,
  },
  caseInfo: {
    marginLeft: 15,
  },
  imgCase: {
    height: 48,
    width: 48,
  },
  modalTheftInfo: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewTheftInfo: {
    backgroundColor: Colors.WHITE,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
