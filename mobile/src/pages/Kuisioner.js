import React, {useState} from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {PAGES} from '../routes';
import KuisionerNotes from '../components/KuisionerNotes';
import CheckBoxClear from '../components/CheckBoxClear';

const Kuisioner = ({navigation}) => {
  const [statusALumni, setStatusAlumni] = useState('');
  const onPressNext = () => {
    if (statusALumni === 'appraiser') {
      navigation.navigate(PAGES.APPRAISER_REGISTRATION.path);
    } else if (statusALumni === 'alumni') {
      navigation.navigate(PAGES.ALUMNI_REGISTRATION.path);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: '#ffffff',
        }}>
        <KuisionerNotes />
        <View style={{marginBottom: 12}}>
          <Text>Hormat Kami : Kemahasiswaan Poltekkes Kemenkes Medan</Text>
          <Text>Email : kemahasiswaan.poltekkesmedan@gmail.com</Text>
        </View>
        <View
          style={{
            backgroundColor: '#EFF6FF',
            paddingVertical: 12,
            paddingHorizontal: 8,
            borderTopColor: '#3B82F6',
            borderTopWidth: 1,
          }}>
          <Text style={{color: '#1E3A8A'}}>Informasi password</Text>
          <Text style={{color: '#1E3A8A', paddingVertical: 4, fontSize: 12}}>
            Kami akan mengirimkan password kepada akun yang Anda daftarkan pada
            aplikasi ini setelah Anda selesai mengisi kuisioner tracer study
            Poltekkes Medan.
          </Text>
          <Text style={{color: '#1E3A8A', fontSize: 12}}>
            Kami akan mengirimkan password kepada akun yang Anda daftarkan pada
            aplikasi ini setelah Anda selesai mengisi kuisioner tracer study
            Poltekkes Medan.
          </Text>
        </View>
        <View style={{marginVertical: 4}} />
        <CheckBoxClear
          title="Pengguna Alumni"
          checked={statusALumni === 'appraiser'}
          onPress={() => setStatusAlumni('appraiser')}
        />
        <CheckBoxClear
          title="Alumni"
          checked={statusALumni === 'alumni'}
          onPress={() => setStatusAlumni('alumni')}
        />
        <Button
          title="Lanjutkan"
          buttonStyle={{
            backgroundColor: '#047857',
            marginTop: 20,
          }}
          onPress={onPressNext}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Kuisioner;
