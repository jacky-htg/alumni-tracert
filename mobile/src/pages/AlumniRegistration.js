import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {PAGES} from '../routes';
import InputBorderer from '../components/InputBorderer';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;

import {Alumni} from '../proto/alumni_message_pb';
import {User, AlumniRegistrationInput} from '../proto/user_message_pb';
import {Certificate} from '../proto/certificate_message_pb';
import {TracertServiceClient} from '../proto/Tracert_serviceServiceClientPb';
import alumniService from '../services/alumni';

const AlumniRegistration = ({navigation}) => {
  const [name, setName] = useState(null);
  const [nim, setNim] = useState(null);
  const [nik, setNik] = useState(null);
  const [birthPlace, setBirthPlace] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [prodi, setProdi] = useState(null);
  const [prodiList, setProdiList] = useState([
    'Jurusan Analisis Kesehatan/TLM',
    'Jurusan Farmasi',
    'Prodi D4 Gizi',
    'Prodi D3 Gizi',
    'Prodi D4 Keperawatan',
    'Prodi D3 Keperawatan Medan',
    'Jurusan Kesehatan Gigi',
    'Prodi D4 Sanitasi',
    'Prodi D3 Sanitasi',
    'Prodi D4 Kebidanan',
    'Prodi D3 Kebidanan Medan',
    'Prodi D3 Kebidanan P. Sidimpuan',
    'Prodi D3 Kebidanan P. Siantar',
    'Prodi D3 Kebidanan Tarutung',
    'Prodi D3 Kebidanan Karo',
    'Prodi D3 Keperawatan Gunung Sitoli',
    'Prodi D3 Keperawatan Dairi',
    'Prodi D3 Keperawatan Sibolga',
    'Prodi Profesi Bidan',
  ]);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [yearList, setYearList] = useState([]);
  const [yearList2, setYearList2] = useState([]);
  const [ijazah, setIjazah] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const userProto = new User();
  const alumniProto = new Alumni();
  const alumniRegistrationProto = new AlumniRegistrationInput();
  const certificateProto = new Certificate();

  useEffect(() => {
    let year = parseInt(moment().format('YYYY'));
    let temp = [];
    for (let i = year; i > year - 50; i--) {
      temp.push(i + '');
    }
    setYearList(temp);
  }, []);

  useEffect(() => {
    if (startYear) {
      let year = parseInt(moment().format('YYYY'));
      let start = parseInt(startYear);
      let temp = [];
      for (let i = year; i > start; i--) {
        temp.push(i + '');
      }
      setYearList2(temp);
    }
  }, [startYear]);

  const onPressNext = () => {
    console.log({
      name,
      nim,
      nik,
      birthPlace,
      birthDate,
      prodi,
      startYear,
      endYear,
      ijazah,
      phone,
      email,
    });
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
    <SafeAreaView
      style={{
        paddingTop: 24,
        backgroundColor: '#ffffff',
      }}>
      <Text h4 style={{marginBottom: 24, marginLeft: 24}}>
        KUISIONER TRACER STUDY/PENGGUNA ALUMNI
      </Text>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 100,
          backgroundColor: '#ffffff',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>IDENTITAS ALUMNI</Text>
        <View style={{paddingTop: 12}}>
          <InputBorderer
            label="Nama"
            onChangeText={value => {
              setName(value);
            }}
          />
          <InputBorderer
            label="NIM"
            onChangeText={value => {
              setNim(value);
            }}
          />
          <InputBorderer
            label="NIK"
            onChangeText={value => {
              setNik(value);
            }}
          />
          <InputBorderer
            label="TEMPAT LAHIR"
            onChangeText={value => {
              setBirthPlace(value);
            }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 8,
              color: '#86939e',
            }}>
            TANGGAL LAHIR
          </Text>
          <DatePicker
            style={{
              width: windowWidth - 48,
              // backgroundColor: 'red',
              borderRadius: 8,
              borderWidth: 0,
              marginTop: 8,
              marginBottom: 24,
            }}
            date={birthDate}
            mode="date"
            placeholder="Pilih Tanggal"
            format="DD-MM-YYYY"
            maxDate={moment(new Date()).format('YYYY-MM-DD')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderRadius: 8,
                borderColor: '#86939e',
                borderWidth: 1,
                height: 50,
                paddingVertical: 0,
                textAlign: 'left',
                color: '#86939e',
              },
              dateText: {
                fontSize: 16,
                textAlign: 'left',
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              // alert(moment(new Date()).format('YYYY-MM-DD'));
              setBirthDate(date);
              // setBirthDate(moment(date).format('DD-MM-YYYY'));
              // this.setState({date: date});
            }}
            showIcon={false}
          />

          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginVertical: 8,
              color: '#86939e',
            }}>
            JURUSAN/PRODI
          </Text>
          <View
            style={{borderWidth: 1, borderColor: '#86939e', borderRadius: 8}}>
            <Picker
              selectedValue={prodi}
              onValueChange={(itemValue, itemIndex) => setProdi(itemValue)}
              style={
                {
                  // backgroundColor: 'gray',
                }
              }>
              <Picker.Item
                enabled={false}
                label="Pilih Jurusan/Prodi"
                value=""
                style={{color: 'gray'}}
              />
              {prodiList.map(prod => {
                return <Picker.Item key={prod} label={prod} value={prod} />;
              })}
            </Picker>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginVertical: 24,
            }}>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginVertical: 8,
                  color: '#86939e',
                }}>
                TAHUN MASUK
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#86939e',
                  borderRadius: 8,
                  width: '96%',
                }}>
                <Picker
                  selectedValue={startYear}
                  onValueChange={(itemValue, itemIndex) =>
                    setStartYear(itemValue)
                  }
                  style={
                    {
                      // backgroundColor: 'gray',
                    }
                  }>
                  <Picker.Item
                    enabled={false}
                    label="Pilih Tahun"
                    value=""
                    style={{color: 'gray'}}
                  />
                  {yearList.map(year => {
                    return (
                      <Picker.Item
                        key={year}
                        label={year}
                        value={year}
                        style={{color: 'black'}}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginVertical: 8,
                  color: '#86939e',
                }}>
                TAHUN LULUS
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#86939e',
                  borderRadius: 8,
                }}>
                <Picker
                  selectedValue={endYear}
                  onValueChange={(itemValue, itemIndex) =>
                    setEndYear(itemValue)
                  }
                  style={
                    {
                      // backgroundColor: 'gray',
                    }
                  }>
                  <Picker.Item
                    enabled={false}
                    label="Pilih Tahun"
                    value=""
                    style={{color: 'gray'}}
                  />
                  {yearList2.map(year => {
                    return (
                      <Picker.Item
                        key={year}
                        label={year}
                        value={year}
                        style={{color: 'black'}}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="NO IJAZAH"
            onChangeText={value => {
              setIjazah(value);
            }}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="NO TELP/WA"
            onChangeText={value => {
              setPhone(value);
            }}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="EMAIL"
            onChangeText={value => {
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

export default AlumniRegistration;
