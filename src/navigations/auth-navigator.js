import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@scenes/login';

const loginScreenOptions = {
  headerShown: false,
  //animationTypeForReplace: state.isSignout ? 'pop' : 'push',
};

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={LoginScreen}
        name="Login"
        options={loginScreenOptions}
      />
    </Stack.Navigator>
  );
}
