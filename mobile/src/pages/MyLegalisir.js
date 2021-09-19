import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {Button, Text, Card, Chip} from 'react-native-elements';

const MyLegalisir = ({navigation}) => {
  const [myLegalisir, setLegalisir] = useState([
    {
      studi: 'Prodi D3 Kebidanan',
      status: 1,
      isOffline: false,
      number: 123123123,
    },
    {
      studi: 'Prodi D3 Kebidanan',
      status: 0,
      isOffline: false,
      number: 1242142,
    },
    {
      studi: 'Prodi D3 Kebidanan',
      status: 2,
      isOffline: false,
      number: 5376457,
    },
    {
      studi: 'Prodi D3 Kebidanan',
      status: 3,
      isOffline: false,
      number: 769687,
    },
  ]);
  const onPressIjazah = detail => {
    console.log('GO TO detail ijazah', detail);
  };
  const getChipByStatus = data => {
    switch (data.status) {
      case 0:
        return (
          <Chip
            title="Ditolak"
            buttonStyle={{backgroundColor: '#EF4444'}}
            onPress={() => onPressIjazah(data)}
          />
        );
      case 1:
        return (
          <Chip
            title="Submited"
            buttonStyle={{backgroundColor: '#4F46E5'}}
            onPress={() => onPressIjazah(data)}
          />
        );
      case 2:
        return (
          <Chip
            title="Diverifikasi"
            buttonStyle={{backgroundColor: '#059669'}}
            onPress={() => onPressIjazah(data)}
          />
        );
      case 3:
        return (
          <Chip
            title="Disetujui"
            buttonStyle={{backgroundColor: '#E5E7EB'}}
            onPress={() => onPressIjazah(data)}
          />
        );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 24,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>E-Legalisir</Text>
        <Button
          type="clear"
          buttonStyle={{color: '#047857'}}
          title="+Tambah Ijazah"
        />
      </View>
      <ScrollView style={{marginTop: 8}}>
        {myLegalisir.map((legal, i) => (
          <Card key={i}>
            <Card.Title>{`${legal.studi} ${legal.number}`}</Card.Title>
            <Card.Divider />
            {getChipByStatus(legal)}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyLegalisir;
