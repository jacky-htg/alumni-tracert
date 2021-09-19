import React, {useState} from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import KuisionerNotes from '../components/KuisionerNotes';
import {createUser} from '../utils/actions';
import {useDispatch} from 'react-redux';

const AppraiserRegistration = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onPressNext = async () => {
    setLoading(true);
    try {
      await dispatch(createUser(name, email));
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
          loading={isLoading}
          onPress={onPressNext}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppraiserRegistration;
