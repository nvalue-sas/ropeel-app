import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../navigations/HomeStack';
import UserReportsStack from '../navigations/UserReportsStack';
import MessagesScreen from '@scenes/messages/MessagesView';
import ProfileStack from '../navigations/ProfileStack';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '@styles/index';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          //focused ? 'icon-x' : 'icon-y'
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'UserReports') {
            iconName = 'profile';
          } else if (route.name === 'Messages') {
            iconName = 'message1';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.PRIMARY,
        inactiveTintColor: Colors.TEXT,
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="UserReports" component={UserReportsStack} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
