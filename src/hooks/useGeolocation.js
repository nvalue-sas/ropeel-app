import * as React from 'react';
import {Dimensions} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import geolocationUtils from '@utils/GeolocationUtil';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const hasLocationPermission = geolocationUtils;

const useGeoLocation = () => {
  const [location, setLocation] = React.useState({
    accuracy: null,
    altitude: null,
    latitude: null,
    longitude: null,
    longitudeDelta: LATITUDE_DELTA,
    latitudeDelta: LONGITUDE_DELTA,
    speed: null,
    timestamp: Date.now(),
  });

  React.useEffect(() => {
    const locationPermission = hasLocationPermission();
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            longitudeDelta: LATITUDE_DELTA,
            latitudeDelta: LONGITUDE_DELTA,
            speed: position.coords.speed,
            timestamp: position.coords.time,
            error: null,
          });
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    }
  }, []);
  return location;
};

/*Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
});*/

export default useGeoLocation;
