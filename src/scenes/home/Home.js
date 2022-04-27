import * as React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import GenericButton from '../../componets/atoms/GenericButton';
import HomeMap from '../../componets/molecules/HomeMap';
import {AuthContext} from '../../context';
import useGeoLocation from '../../hooks/useGeolocation';
import {Colors} from '@styles/index';
import {USR_UPDATE_LOCATION} from '../../constants/RopeelAPI';

export default function HomeView({navigation}) {
  const {userLoggedIn} = React.useContext(AuthContext);
  const geolocationState = useGeoLocation();

  React.useEffect(() => {
    if (
      geolocationState.latitude !== null &&
      geolocationState.longitude !== null
    ) {
      fetch(USR_UPDATE_LOCATION, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user: userLoggedIn,
          latitude: geolocationState.latitude,
          longitude: geolocationState.longitude,
        }),
      })
        .then((apiResponse) => apiResponse.json())
        .then((apiData) => {
          if (apiData.logType !== 'success') {
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
  }, [userLoggedIn, geolocationState]);

  function createReport() {
    navigation.navigate('Report', {
      user: userLoggedIn,
      latitude: geolocationState.latitude,
      longitude: geolocationState.longitude,
    });
  }

  return (
    <View style={styles.container}>
      <HomeMap
        location={geolocationState}
        navigation={navigation}
        user={userLoggedIn}
      />
      <View style={styles.reportButtonContainer}>
        <GenericButton
          type="primary"
          title="REPORTAR ROBO"
          onPress={() => createReport()}
          style={styles.reportButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  reportButtonContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  reportButton: {
    marginBottom: 20,
  },
});
