import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {getLegalizeList, setDetailIjazah} from '../utils/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, Card, Chip} from 'react-native-elements';
import {PAGES} from '../routes';

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
          onPress={onPressAddIjazah}
        />
      </View>
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
    </View>
  );
};

export default MyLegalisir;
