import React, {useState, useEffect} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';
import {getLegalizeList, setDetailIjazah} from '../utils/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, Card, Chip, Divider} from 'react-native-elements';
import {PAGES} from '../routes';
import storage from '../utils/storage';
const windowWidth = Dimensions.get('window').width;

const MyLegalisir = ({navigation}) => {
  const {isLogin, legalisirList} = useSelector(state => ({
    isLogin: state.isLogin,
    legalisirList: state.legalisirList,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLegalizeList());
  }, []);
  const onPressIjazah = detail => {
    dispatch(setDetailIjazah(detail));
    navigation.navigate(PAGES.DETAIL_CERTIFICATE.path);
  };
  const onPressAddIjazah = () => {
    navigation.navigate(PAGES.ADD_IJAZAH.path);
  };
  const onPressKuisioner = () => {
    navigation.navigate(PAGES.KUISIONER_FORM.path);
  };
  const onPressLogout = async () => {
    await storage.clearMap();
    navigation.navigate(PAGES.HOME.path);
  };
  const getChipByStatus = data => {
    switch (data.legalize.status) {
      case 0:
        return (
          <Chip
            title="Terdaftar"
            buttonStyle={{backgroundColor: '#E5E7EB'}}
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
            buttonStyle={{backgroundColor: '#4F46E5'}}
            onPress={() => onPressIjazah(data)}
          />
        );
      case 3:
        return (
          <Chip
            title="Disetujui"
            buttonStyle={{backgroundColor: '#059669'}}
            onPress={() => onPressIjazah(data)}
          />
        );
      case 4:
        return (
          <Chip
            title="Ditolak"
            buttonStyle={{backgroundColor: '#EF4444'}}
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
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          paddingHorizontal: 24,
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>E-Legalisir</Text>
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          marginHorizontal: 24,
          marginVertical: 24,
        }}>{`Anda memiliki ${legalisirList.length} ijazah yang telah didaftarkan`}</Text>
      <Divider orientation="horizontal" style={{marginHorizontal: 24}} />
      <ScrollView style={{marginTop: 8}}>
        {legalisirList.length > 0 &&
          legalisirList.map((legal, i) => (
            <Card key={i}>
              <Card.Title>{`${legal.majorStudy} ${legal.noIjazah}`}</Card.Title>
              <Card.Divider />
              {getChipByStatus(legal)}
            </Card>
          ))}
      </ScrollView>
      <Divider orientation="horizontal" style={{marginHorizontal: 24}} />
      <View
        style={{
          padding: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          title="Tambah Ijazah"
          type="outline"
          buttonStyle={{
            paddingHorizontal: 24,
            minWidth: windowWidth / 2 - 36,
          }}
          onPress={onPressAddIjazah}
        />
        <Button
          title="Isi Kuisioner"
          type="outline"
          buttonStyle={{
            paddingHorizontal: 24,
            minWidth: windowWidth / 2 - 36,
          }}
          onPress={onPressKuisioner}
        />
      </View>
    </View>
  );
};

export default MyLegalisir;
