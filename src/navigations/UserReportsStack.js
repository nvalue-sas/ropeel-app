import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserReportsScreen from '@scenes/user_reports/UserReportsView';
import TrackingDatailScreen from '@scenes/user_reports/TrackingDatailView';
import GenericText from '../componets/atoms/GenericText';
import {Colors} from '@styles/index';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const trackingReportScreenOptions = {
  headerTitle: <GenericText type="h4" text="Seguimiento" />,
  headerTintColor: Colors.PRIMARY,
};

export default function UserReportsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserReports"
        component={UserReportsScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="TrackingReport"
        component={TrackingDatailScreen}
        options={trackingReportScreenOptions}
      />
    </Stack.Navigator>
  );
}
