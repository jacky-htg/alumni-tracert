import React, {useEffect, useState} from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import KuisionerNotes from '../components/KuisionerNotes';
import {createUser, getAlumniList, registerAppraiser} from '../utils/actions';
import InputBorderer from '../components/InputBorderer';
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
            <InputBorderer
              label="Instansi"
              onChangeText={e => setInstansi(e)}
            />
            <InputBorderer label="Posisi" onChangeText={e => setPosition(e)} />
            <Text
              style={{
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: 16,
                color: '#9CA3AF',
              }}>
              Nama Alumni
            </Text>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={true}
              onSelectItem={a => {
                setAlumniData(a);
              }}
              dataSet={alumniList}
              textInputProps={{
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  paddingLeft: 4,
                  borderWidth: 1,
                  borderColor: '#9CA3AF',
                  height: 52,
                  marginBottom: 20,
                },
              }}
              rightButtonsContainerStyle={{
                right: 8,
                height: 30,
                top: 12,
                alignSelfs: 'center',
                backgroundColor: '#fff',
              }}
            />
            <InputBorderer
              label="Posisi Alumni"
              onChangeText={e => setAlumniPosition(e)}
            />
          </View>
        ) : (
          <View style={{paddingTop: 12}}>
            <InputBorderer label="Nama" onChangeText={e => setName(e)} />
            <InputBorderer label="Email" onChangeText={e => setEmail(e)} />
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
