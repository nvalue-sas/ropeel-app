import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VechicleTypes from '../scenes/vehicle/VehicleTypes';
import VehicleSubtypes from '../scenes/vehicle/VehicleSubtypes';
import VehicleInfo from '../scenes/vehicle/VehicleInfo';
import VehicleBrands from '../scenes/vehicle/VehicleBrands';
import VehicleAditionalInfo from '../scenes/vehicle/VehicleAditionalInfo';

const Stack = createStackNavigator();

const vehicleScreenOptions = {
  headerShown: false,
};

export default function VehicleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VehicleTypes"
        component={VechicleTypes}
        options={vehicleScreenOptions}
      />
      <Stack.Screen
        name="VehicleSubypes"
        component={VehicleSubtypes}
        options={vehicleScreenOptions}
      />
      <Stack.Screen
        name="VehicleBasicInfo"
        component={VehicleInfo}
        options={vehicleScreenOptions}
      />
      <Stack.Screen
        name="VehicleBrands"
        component={VehicleBrands}
        options={vehicleScreenOptions}
      />
      <Stack.Screen
        name="VehicleAddInfo"
        component={VehicleAditionalInfo}
        options={vehicleScreenOptions}
      />
    </Stack.Navigator>
  );
}
