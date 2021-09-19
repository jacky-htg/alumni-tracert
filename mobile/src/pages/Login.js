import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {Button, Text, Card, Input} from 'react-native-elements';

import {LoginInput} from '../../proto/single-proto_pb';
import {deps} from '../../services/tracert';

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    // loginInput.setEmail('rijal.asep.nugroho@gmail.com');
    // loginInput.setPassword('hariINI@2021');
    let loginInput = new LoginInput();
    loginInput.setEmail(`${email}`);
    loginInput.setPassword(`${password}`);
    const mylogin = new Login(deps, loginInput);
    return mylogin.login();
  };

  const onPressLogin = async () => {
    setLoading(true);
    try {
      const token = await login();
      console.log('token', token.getToken());
      if (token) {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log('ERR = ');
    }
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
        <Input placeholder="Username" onChangeText={e => setEmail(e)} />

        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
          value={password}
        />

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

export default Login;
