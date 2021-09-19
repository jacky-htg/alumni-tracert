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

const SapaAlumni = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 24,
      }}>
      <Text style={{fontSize: 28, fontWeight: 'bold'}}>Sapa Alumni</Text>
      <View style={{marginTop: 40}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Halaman ini masih dalam tahap pengembangan.
        </Text>
        <Text style={{fontSize: 14, marginTop: 24}}>
          Halaman ini masih dalam pengembangan dengan fitur berupa berita-berita
          tentang alumni Poltekkes Medan.
        </Text>
      </View>
    </View>
  );
};

export default SapaAlumni;
