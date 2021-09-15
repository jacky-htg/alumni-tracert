import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import CDC from './pages/CDC';
import SapaAlumni from './pages/SapaAlumni';
import AboutUs from './pages/AboutUs';
import MyLegalisir from './pages/MyLegalisir';
import {Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const getTabIcon = (route, size, color) => {
  switch (route.name) {
    case 'E-Legalisir':
      return <Ionicons name="ribbon" size={size} color={color} />;
    case 'CDC':
      return <Ionicons name="stats-chart" size={size} color={color} />;
    case 'Alumni':
      return <Ionicons name="people-circle" size={size} color={color} />;
    case 'About':
      return <Ionicons name="help-circle" size={size} color={color} />;
    default:
      return <Ionicons name="home" type="material" size={size} color={color} />;
  }
};

export const TabLogin = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => getTabIcon(route, size, color),
      })}>
      <Tab.Screen
        name="E-Legalisir"
        component={MyLegalisir}
        options={{headerShown: false}}
      />
      <Tab.Screen name="CDC" component={CDC} options={{headerShown: false}} />
      <Tab.Screen
        name="Alumni"
        component={SapaAlumni}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="About"
        component={AboutUs}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export const TabNotLogin = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => getTabIcon(route, size, color),
      })}>
      <Tab.Screen name="CDC" component={CDC} options={{headerShown: false}} />
      <Tab.Screen
        name="Alumni"
        component={SapaAlumni}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="About"
        component={AboutUs}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export const PAGES = {
  HOME: {
    path: 'home',
    component: Home,
    options: {headerShown: false},
  },
  LOGIN: {
    path: 'login',
    component: Login,
    options: {headerShown: false},
  },
  TAB_LOGIN: {
    path: 'tab1',
    component: TabLogin,
    options: {headerShown: false},
  },
  TAB_NOT_LOGIN: {
    path: 'tab2',
    component: TabNotLogin,
    options: {headerShown: false},
  },
};
