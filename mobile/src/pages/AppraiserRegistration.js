import React, {useEffect, useState} from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import KuisionerNotes from '../components/KuisionerNotes';
import {createUser, getAlumniList, registerAppraiser} from '../utils/actions';
import InputBorderer from '../components/InputBorderer';
import SearchDropDown from '../components/SearchDropDown';
import {useDispatch, useSelector} from 'react-redux';
import {PAGES} from '../routes';

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
  const [resetPage, setResetPage] = useState(false);
  const dispatch = useDispatch();
  const onPressNext = async () => {
    setLoading(true);
    try {
      if (!isLogin) {
        await dispatch(createUser(name, email));
        // console.log('resp.toObject()', resp.toObject());
      } else {
        const data = {
          name,
          instansi,
          position,
          alumniPosition,
          alumniData,
        };
        await dispatch(registerAppraiser(data));
        navigation.reset({
          index: 0,
          routes: [{name: PAGES.KUISIONER_FORM.path}],
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getAlumniList('', 10, 1));
      setResetPage(true);
      setTimeout(() => {
        setResetPage(false);
      }, 500);
    }
  }, [isLogin]);

  useEffect(() => {
    console.log('alumniList', alumniList);
  }, [alumniList]);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: '#ffffff',
        }}>
        <KuisionerNotes />
        {isLogin ? (
          resetPage ? (
            <View />
          ) : (
            <View style={{paddingTop: 12}}>
              <InputBorderer
                label="Instansi"
                onChangeText={e => setInstansi(e)}
              />
              <InputBorderer
                label="Posisi"
                onChangeText={e => setPosition(e)}
              />
              <SearchDropDown
                label="Nama Alumni"
                onSelectItem={a => {
                  setAlumniData(a);
                }}
                dataSet={alumniList}
              />
              <InputBorderer
                label="Posisi Alumni"
                onChangeText={e => setAlumniPosition(e)}
              />
            </View>
          )
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
