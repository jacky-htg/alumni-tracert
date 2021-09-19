import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {Button, Text, Card, Input} from 'react-native-elements';

const CDC = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 24,
      }}>
      <Text style={{fontSize: 28, fontWeight: 'bold'}}>
        Career Development Center
      </Text>
      <View style={{marginTop: 40}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Halaman ini masih dalam tahap pengembangan.
        </Text>
        <Text style={{fontSize: 14, marginTop: 24}}>
          Halaman ini masih dalam pengembangan dengan fitur-fitur berikut :
        </Text>
        <View style={{marginTop: 12}}>
          <Text style={{fontSize: 14}}>Konseling Karir</Text>
          <Text style={{fontSize: 14}}>Pelatihan Softskill</Text>
          <Text style={{fontSize: 14}}>Informasi Lowongan</Text>
          <Text style={{fontSize: 14}}>Informasi Karir</Text>
        </View>
      </View>
    </View>
  );
};

export default CDC;
