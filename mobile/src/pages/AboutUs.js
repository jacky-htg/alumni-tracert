import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Text, Divider} from 'react-native-elements';
import {PAGES} from '../routes';
import {logout} from '../utils/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutUs = ({navigation}) => {
  const {isLogin} = useSelector(state => ({
    isLogin: state.isLogin,
  }));
  const dispatch = useDispatch();
  const onPressLogout = async () => {
    await dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: PAGES.HOME.path}],
    });
  };
  const onPressChangePassword = async () => {
    navigation.navigate(PAGES.CHANGE_PASSWORD.path);
  };
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
        paddingTop: 24,
      }}>
      <Text style={{fontSize: 28, fontWeight: 'bold'}}>Tentang Kami</Text>
      <View style={{marginTop: 40, marginBottom: 24}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Halaman ini masih dalam tahap pengembangan.
        </Text>
        <Text style={{fontSize: 14, marginTop: 24}}>
          Halaman ini masih dalam pengembangan dengan fitur-fitur berikut :
        </Text>
        <View style={{marginTop: 12}}>
          <Text style={{fontSize: 14}}>
            Tentang CDC Poltekkes Kemenkes Medan
          </Text>
          <Text style={{fontSize: 14}}>Struktur Organisasi</Text>
          <Text style={{fontSize: 14}}>
            Kontak CDC Poltekkes Kemenkes Medan
          </Text>
          <Text style={{fontSize: 14}}>FAQ (Frequently Asked Question)</Text>
        </View>
      </View>
      {isLogin && (
        <>
          <Divider orientation="horizontal" />
          <Button
            type="clear"
            buttonStyle={{
              height: 52,
              justifyContent: 'flex-start',
              paddingLeft: 0,
            }}
            title="Ganti Password"
            onPress={onPressChangePassword}
          />
          <Button
            type="clear"
            icon={
              <Ionicons
                name="exit-outline"
                size={20}
                color={'#EF4444'}
                style={{marginRight: 8}}
              />
            }
            buttonStyle={{
              height: 52,
              justifyContent: 'flex-start',
              paddingLeft: 0,
            }}
            titleStyle={{color: '#EF4444'}}
            title="Logout"
            onPress={onPressLogout}
          />
        </>
      )}
    </View>
  );
};

export default AboutUs;
