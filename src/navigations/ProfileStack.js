import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '@scenes/profile/ProfileView';
import VechicleStack from '../navigations/VechicleStack';
import GenericText from '../componets/atoms/GenericText';
import {Colors} from '@styles/index';

const Stack = createStackNavigator();

const profileScreenOptions = {
  headerShown: false,
};

const vehicleScreenOptions = {
  headerTitle: <GenericText type="h4" text="Vehiculo" />,
  headerTintColor: Colors.PRIMARY,
  //headerTransparent: true,
};

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
      <Stack.Screen
        name="Vehicle"
        component={VechicleStack}
        options={vehicleScreenOptions}
      />
    </Stack.Navigator>
  );
}
