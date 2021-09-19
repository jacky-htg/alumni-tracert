import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import {PAGES} from '../routes';
import DatePicker from 'react-native-datepicker';
const windowWidth = Dimensions.get('window').width;

const AlumniRegistration = ({navigation}) => {
  const onPressNext = () => {};
  const inputStyle = {
    paddingHorizontal: 0,
  };
  const inputContStyle = {
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
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
          backgroundColor: '#ffffff',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>IDENTITAS ALUMNI</Text>
        <View style={{paddingTop: 12}}>
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="Nama"
            onChange={e => {
              const {value} = e.target;
              // setName(value);
            }}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="NIM"
            onChange={e => {
              const {value} = e.target;
              // setName(value);
            }}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="NIK"
            onChange={e => {
              const {value} = e.target;
              // setName(value);
            }}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="TEMPAT LAHIR"
            onChange={e => {
              const {value} = e.target;
              // setName(value);
            }}
          />
          <Input
            containerStyle={inputStyle}
            inputContainerStyle={inputContStyle}
            label="TEMPAT LAHIR"
            onChange={e => {
              const {value} = e.target;
              // setName(value);
            }}
          />
          <DatePicker
            style={{
              width: windowWidth - 48,
              height: 60,
              backgroundColor: 'red',
              borderRadius: 8,
              borderWidth: 0,
            }}
            // date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                // marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              // this.setState({date: date});
            }}
            showIcon={false}
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
