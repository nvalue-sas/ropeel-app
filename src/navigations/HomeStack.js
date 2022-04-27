import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Report from '../scenes/report/Report';
import UserTrack from '../scenes/user_track/UserTrackView';
import Home from '../scenes/home/Home';

const Stack = createStackNavigator();

const HomeScreenOptions = {
  headerShown: false,
};

const reportScreenOptions = {
  title: 'Reportar',
};

const userTrackScreenOptions = {
  title: 'Reportar un seguimiento',
};

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={HomeScreenOptions} />
      <Stack.Screen
        name="Report"
        component={Report}
        options={reportScreenOptions}
      />
      <Stack.Screen
        name="UserTrack"
        component={UserTrack}
        options={userTrackScreenOptions}
      />
    </Stack.Navigator>
  );
}
