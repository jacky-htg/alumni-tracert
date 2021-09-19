import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import storage from '../utils/storage';
import {PAGES} from '../routes';
import {getLegalizeList} from '../utils/actions';

const SplashScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initLoad = async () => {
    setLoading(true);
    try {
      const token = await storage.load({key: 'token'});
      if (token) {
        await dispatch(getLegalizeList());
        navigation.navigate(PAGES.TAB_LOGIN.path);
      } else {
        navigation.navigate(PAGES.HOME.path);
      }
    } catch (e) {
      navigation.navigate(PAGES.HOME.path);
    }
  };
  useEffect(() => {
    initLoad();
  }, []);
  return <View style={{flex: 1, backgroundColor: '#ffffff'}} />;
};

export default SplashScreen;
