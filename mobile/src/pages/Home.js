import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {PAGES} from '../routes';
import {Button, Text, Divider} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {
  const onPressLogin = () => {
    navigation.navigate(PAGES.LOGIN.path);
  };
  return (
    <ScrollView>
      <Image
        style={{height: 200, width: windowWidth}}
        resizeMethod="resize"
        resizeMode="cover"
        source={require('../assets/img/poltekkes-medan.jpeg')}
      />
      <View style={{paddingHorizontal: 24, paddingTop: 24}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          ANTER Poltekkes Medan
        </Text>
        <Text style={{marginVertical: 8}}>
          Anda sudah mempunyai akun? Silahkan login untuk bisa menikmati
          fasilitas aplikasi ANTER Poltekkes Medan
        </Text>
        <Button
          title="Login"
          buttonStyle={{
            width: windowWidth / 2,
            backgroundColor: '#047857',
          }}
          onPress={onPressLogin}
        />
        <Divider
          orientation="horizontal"
          width={1}
          style={{marginVertical: 24}}
        />
        <Text style={{marginBottom: 8}}>
          Bagi alumni Poltekkes Medan yang belum mengisi kuesioner Tracer Study
          Poltekkes Medan, silahkan tekan tombol dibawah ini.
        </Text>
        <Button
          title="Kuisioner alumni tracer"
          buttonStyle={{
            backgroundColor: '#047857',
          }}
        />
        <Divider
          orientation="horizontal"
          width={1}
          style={{marginVertical: 24}}
        />
        <Text style={{marginBottom: 8}}>
          Kunjungi halaman informasi kami lainnya
        </Text>
        <Button
          title="Career Development Center"
          type="clear"
          buttonStyle={{
            justifyContent: 'flex-start',
            paddingLeft: 0,
          }}
          titleStyle={{
            color: '#047857',
          }}
          onPress={() => navigation.navigate(PAGES.TAB_NOT_LOGIN.path)}
        />
        <Button
          title="Sapa Almuni"
          type="clear"
          buttonStyle={{
            justifyContent: 'flex-start',
            paddingLeft: 0,
          }}
          titleStyle={{
            color: '#047857',
          }}
          onPress={() => navigation.navigate(PAGES.TAB_NOT_LOGIN.path)}
        />
        <Button
          title="Tentang Kami"
          type="clear"
          buttonStyle={{
            justifyContent: 'flex-start',
            paddingLeft: 0,
          }}
          titleStyle={{
            color: '#047857',
          }}
          onPress={() => navigation.navigate(PAGES.TAB_NOT_LOGIN.path)}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
