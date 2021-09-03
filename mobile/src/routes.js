import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import CDC from './pages/CDC';
import SapaAlumni from './pages/SapaAlumni';
import AboutUs from './pages/AboutUs';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export const TabLogin = () => {
  return (
    <Tab.Navigator>
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
    <Tab.Navigator>
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
