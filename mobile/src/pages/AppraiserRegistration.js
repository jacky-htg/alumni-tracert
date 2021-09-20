import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {CheckBox, Button, Input} from 'react-native-elements';
import {PAGES} from '../routes';
import {TracertServiceClient} from '../proto/Tracert_serviceServiceClientPb';
import KuisionerNotes from '../components/KuisionerNotes';
import {User} from '../proto/user_message_pb';
import userService from '../services/user';
import {grpc} from '@improbable-eng/grpc-web';
import {ReactNativeTransport} from '@improbable-eng/grpc-web-react-native-transport';

async function userRegistrationCall(name, email) {
  var deps = {
    proto: {
      TracertClient: TracertServiceClient,
    },
  };
  const userProto = new User();
  userProto.setUserType(2); // 2 = appraiser
  userProto.setName(name);
  userProto.setEmail(email);
  grpc.unary(TracertServiceClient.userCreate, {
    request: userProto,
    host: 'https://api.borobudur.rijalasepnugroho.com',
    transport: ReactNativeTransport(),
    onEnd: (code, msg, trailers) => {
      if (code == grpc.Code.OK) {
        console.log('all ok');
      } else {
        console.log('hit an error', code, msg, trailers);
      }
    },
    onError: err => {
      console.log('ERR = ', err);
    },
  });
  // const user = new userService(deps, userProto);
  // return await user.create();
}

const AppraiserRegistration = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onPressNext = async () => {
    try {
      // grpc.setDefaultTransport(ReactNativeTransport());
      userRegistrationCall(name, email);
      // console.log('registerUser', registerUser.toObject());
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
    paddingHorizontal: 12,
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
            onChange={e => {
              const {value} = e.target;
              setName(value);
            }}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="Email"
            onChange={e => {
              const {value} = e.target;
              setEmail(value);
            }}
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
