import React from 'react';
import {Text, View, Button} from 'react-native';
import {PAGES} from '../routes';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>HomePage</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate(PAGES.LOGIN.path)}
      />
    </View>
  );
};

export default Home;
