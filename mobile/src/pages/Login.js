import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {login} from '../utils/actions';
import {useDispatch} from 'react-redux';
import {PAGES} from '../routes';

const Login = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    setLoading(true);
    try {
      await dispatch(login(email, password));
      setLoading(false);
      navigation.navigate(PAGES.TAB_LOGIN.path);
    } catch (e) {
      setLoading(false);
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
