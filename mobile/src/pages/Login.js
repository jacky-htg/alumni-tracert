import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {PAGES} from '../routes';
import {Button, Text, Card, Input} from 'react-native-elements';

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const onPressLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate(PAGES.TAB_LOGIN.path);
    }, 3000);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
      <Card containerStyle={{width: '100%'}}>
        <Image
          resizeMethod="resize"
          resizeMode="cover"
          source={require('../assets/img/logo-poltekkes.png')}
          style={{marginBottom: 24}}
        />
        <Card.Title>Selamat datang, silahkan login</Card.Title>
        <Input placeholder="Username" />

        <Input placeholder="Password" secureTextEntry={true} />

        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: '#047857',
          }}
          loading={isLoading}
          onPress={onPressLogin}
        />
      </Card>
    </View>
  );
};

export default Home;
