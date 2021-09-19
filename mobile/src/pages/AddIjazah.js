import React, {useState, useMemo} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, Card, Chip} from 'react-native-elements';
import SearchDropDown from '../components/SearchDropDown';
import InputBorderer from '../components/InputBorderer';
import {Jurusan} from '../utils/constants';
import {createCertificate, getLegalizeList} from '../utils/actions';

const AddIjazah = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [nim, setNim] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [yearIn, setYearIn] = useState('');
  const [yearOut, setYearOut] = useState('');
  const [noIjazah, setNoIjazah] = useState('');
  const onPressAdd = async () => {
    setLoading(true);
    try {
      const param = {
        nim,
        majorStudy: jurusan.title,
        entryYear: yearIn.id,
        graduationYear: yearOut.id,
        noIjazah,
      };
      await dispatch(createCertificate(param));
      await dispatch(getLegalizeList());
      setLoading(false);
      navigation.goBack();
    } catch (e) {
      setLoading(false);
    }
  };

  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = 1982;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push({id: i, title: `${i}`});
    }
    return years;
  }

  const yearArr = useMemo(() => generateArrayOfYears());
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 12}}>
          Tambah Ijazah
        </Text>
        <Text style={{marginBottom: 24}}>
          Tambahkan informasi ijazah milik anda yang belum teregister di
          E-legalisir
        </Text>
        <InputBorderer label="NIM" onChangeText={setNim} />
        <SearchDropDown
          label="Jurusan/Prodi"
          onSelectItem={setJurusan}
          dataSet={Jurusan}
        />
        <SearchDropDown
          label="Tahun Masuk"
          onSelectItem={setYearIn}
          dataSet={yearArr}
        />
        <SearchDropDown
          label="Tahun Lulus"
          onSelectItem={setYearOut}
          dataSet={yearArr}
        />
        <InputBorderer label="Nomor Ijazah" onChangeText={setNoIjazah} />
        <Button
          title="Tambah"
          buttonStyle={{
            backgroundColor: '#047857',
          }}
          loading={isLoading}
          onPress={onPressAdd}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddIjazah;
