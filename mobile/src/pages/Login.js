import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {LoginInput} from '../proto/user_message_pb';
import {TracertServiceClient} from '../proto/Tracert_serviceServiceClientPb';
import Login from '../services/login';
import {PAGES} from '../routes';
import {Button, Text, Card, Input} from 'react-native-elements';

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  async function loginCall() {
    var deps = {
      proto: {
        TracertClient: TracertServiceClient,
      },
    };

    const loginInput = new LoginInput();
    loginInput.setEmail(username);
    loginInput.setPassword(password);

    let login = new Login(deps, loginInput);
    return await login.login();
  }
  const onPressLogin = async () => {
    setLoading(true);
    try {
      const user = await loginCall();
      /* setTimeout(() => {
      setLoading(false);
      navigation.navigate(PAGES.TAB_LOGIN.path);
    }, 1000); */
    } catch (e) {
      console.log('ERROR = ', e);
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
        <Input
          placeholder="Username"
          onChange={e => {
            const {value} = e.target;
            setUserName(value);
          }}
        />

        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChange={e => {
            const {value} = e.target;
            setPassword(value);
          }}
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

export default Home;
