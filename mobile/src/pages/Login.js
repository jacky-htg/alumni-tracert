import React, {useState} from 'react';
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
  const [token, setToken] = useState();

  const onPressLogin = async () => {
    setLoading(true);
    await login();
    console.log('token', token);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const login = async () => {
    var deps = {
      proto: {
        TracertClient: TracertServicePromiseClient,
      },
    };

    const loginInput = new LoginInput();
    loginInput.setEmail('rijal.asep.nugroho@gmail.com');
    loginInput.setPassword('hariINI@2021');

    const mylogin = new Login(deps, loginInput);
    setToken(await mylogin.login());
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
