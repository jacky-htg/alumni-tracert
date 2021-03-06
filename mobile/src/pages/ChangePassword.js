import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {changePassword} from '../utils/actions';
import {useDispatch} from 'react-redux';

const ChangePassword = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const onPressChangePassword = async () => {
    setLoading(true);
    try {
      await dispatch(changePassword({oldPassword, password, confirmPassword}));
      setLoading(false);
      navigation.goBack();
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
        <Card.Title>masukkan password baru</Card.Title>

        <Input
          placeholder="Password Lama"
          secureTextEntry={true}
          onChangeText={e => setOldPassword(e)}
          value={oldPassword}
        />

        <Input
          placeholder="Password baru"
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
          value={password}
        />

        <Input
          placeholder="Ulang Password baru"
          secureTextEntry={true}
          onChangeText={e => setConfirmPassword(e)}
          value={confirmPassword}
        />

        <Button
          title="Ubah Password"
          buttonStyle={{
            backgroundColor: '#047857',
          }}
          loading={isLoading}
          onPress={onPressChangePassword}
        />
      </Card>
    </View>
  );
};

export default ChangePassword;
