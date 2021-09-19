import React, {useState} from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import {CheckBox, Button, Input} from 'react-native-elements';
import KuisionerNotes from '../components/KuisionerNotes';
import {deps} from '../../services/tracert';
import {User} from '../../proto/single-proto_pb';
import userService from '../../services/user';
import storage from '../utils/storage';

async function userRegistrationCall(name, email) {
  const userProto = new User();
  userProto.setUserType(2); // 2 = appraiser
  userProto.setName(name);
  userProto.setEmail(email);
  const user = new userService(deps, userProto);
  return user.create();
}

const AppraiserRegistration = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onPressNext = async () => {
    try {
      const userCreate = await userRegistrationCall(name, email);
      if (userCreate) {
        storage.save({
          key: 'token', // Note: Do not use underscore("_") in key!
          data: userCreate.toObject(),
        });
        console.log('registerUser', userCreate.toObject());
      }
    } catch (e) {
      console.log('ERROR = ', e);
    }
  };
  const inputStyle = {
    paddingHorizontal: 0,
  };
  const inputContStyle = {
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: '#ffffff',
        }}>
        <KuisionerNotes />
        <View style={{paddingTop: 12}}>
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="Nama"
            onChangeText={e => setName(e)}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="Email"
            onChangeText={e => setEmail(e)}
          />
        </View>
        <Button
          title="Lanjutkan"
          buttonStyle={{
            backgroundColor: '#047857',
          }}
          onPress={onPressNext}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppraiserRegistration;
