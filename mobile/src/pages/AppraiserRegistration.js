import React, {useEffect, useState} from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import KuisionerNotes from '../components/KuisionerNotes';
import {createUser, getAlumniList, registerAppraiser} from '../utils/actions';
import {useDispatch, useSelector} from 'react-redux';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

const AppraiserRegistration = ({navigation}) => {
  const {isLogin, alumniList} = useSelector(state => ({
    isLogin: state.isLogin,
    alumniList: state.alumniList,
  }));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instansi, setInstansi] = useState('');
  const [position, setPosition] = useState('');
  const [alumniPosition, setAlumniPosition] = useState('');
  const [alumniData, setAlumniData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onPressNext = async () => {
    setLoading(true);
    try {
      if (!isLogin) {
        await dispatch(createUser(name, email));
      } else {
        const data = {
          name,
          instansi,
          position,
          alumniPosition,
          alumniData,
        };
        console.log('DATA = ', data);
        await dispatch(registerAppraiser(data));
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getAlumniList('', 10, 1));
    }
  }, [isLogin]);

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
        {isLogin ? (
          <View style={{paddingTop: 12}}>
            <Input
              containerStyle={inputStyle}
              inputContainerStyle={inputContStyle}
              label="Instansi"
              onChangeText={e => setInstansi(e)}
            />
            <Input
              containerStyle={inputStyle}
              inputContainerStyle={inputContStyle}
              label="Posisi"
              onChangeText={e => setPosition(e)}
            />
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={true}
              // initialValue={{id: '2'}} // or just '2'
              onSelectItem={setAlumniData}
              dataSet={alumniList}
              textInputProps={{
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  paddingLeft: 18,
                  borderWidth: 1.2,
                },
              }}
              rightButtonsContainerStyle={{
                borderRadius: 8,
                right: 8,
                height: 30,
                top: 6,
                alignSelfs: 'center',
                backgroundColor: '#fff',
              }}
            />
            <Input
              containerStyle={inputStyle}
              inputContainerStyle={inputContStyle}
              label="Posisi Alumni"
              onChangeText={e => setAlumniPosition(e)}
            />
          </View>
        ) : (
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
        )}

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
