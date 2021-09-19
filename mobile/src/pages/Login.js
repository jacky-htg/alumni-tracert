import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {Button, Text, Card, Input} from 'react-native-elements';

import {LoginInput} from '../../proto/single-proto_pb';
import {TracertServicePromiseClient} from '../../proto/single-proto_grpc_web_pb';
import Login from '../../services/login';

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const onPressLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const loginInput = new LoginInput();
  loginInput.setEmail('rijal.asep.nugroho@gmail.com');
  loginInput.setPassword('hariINI@2021');

  const client = new TracertServicePromiseClient(
    'https://api.borobudur.rijalasepnugroho.com',
    null,
    null,
  );

  const login = () => {
    return client.login(loginInput, {}).then(user => {
      console.log(user);
      return user;
    });
  };

  useEffect(() => {
    login();
  });

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
