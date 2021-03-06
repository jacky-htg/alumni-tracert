import React from 'react';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import CDC from './pages/CDC';
import SapaAlumni from './pages/SapaAlumni';
import AboutUs from './pages/AboutUs';
import MyLegalisir from './pages/MyLegalisir';
import Kuisioner from './pages/Kuisioner';
import AppraiserRegistration from './pages/AppraiserRegistration';
import AlumniRegistration from './pages/AlumniRegistration';
import AddIjazah from './pages/AddIjazah';
import DetailCertificate from './pages/DetailCertificate';
import KuisionerForm from './pages/KuisionerForm';
import ChangePassword from './pages/ChangePassword';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const getTabIcon = (route, size, color) => {
  switch (route.name) {
    case 'E-Legalisir':
      return <Ionicons name="ribbon" size={size} color={color} />;
    /* case 'Kuisioner':
      return <Ionicons name="bookmarks" size={size} color={color} />; */
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
  SPLASH: {
    path: 'splash',
    component: SplashScreen,
    options: {headerShown: false},
  },
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
  KUISIONER: {
    path: 'kuisioner',
    component: Kuisioner,
    options: {headerShown: false},
  },
  APPRAISER_REGISTRATION: {
    path: 'appraiser_registration',
    component: AppraiserRegistration,
    options: {headerShown: false},
  },
  ALUMNI_REGISTRATION: {
    path: 'alumni_registration',
    component: AlumniRegistration,
    options: {headerShown: false},
  },
  ADD_IJAZAH: {
    path: 'add_ijazah',
    component: AddIjazah,
    options: {headerShown: false},
  },
  DETAIL_CERTIFICATE: {
    path: 'detail_certificate',
    component: DetailCertificate,
    options: {headerShown: false},
  },
  KUISIONER_FORM: {
    path: 'kuisioner_form',
    component: KuisionerForm,
    options: {headerShown: false},
  },
  CHANGE_PASSWORD: {
    path: 'change-password',
    component: ChangePassword,
    options: {headerShown: false},
  },
};
