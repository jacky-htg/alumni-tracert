import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, Card, Chip, Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {HOST_URL} from '../../services/tracert';
import storage from '../utils/storage';

const DetailCertificate = ({navigation}) => {
  const {isLogin, detailCertificate} = useSelector(state => ({
    isLogin: state.isLogin,
    detailCertificate: state.detailCertificate,
  }));
  const [isLoading, setLoading] = useState(false);
  const [isLoadingIjazah, setLoadingIjazah] = useState(false);
  const [isLoadingTranscript, setLoadingTranscript] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onLegalisir = () => {};
  const onUploadIjazah = () => {
    setVisible(true);
    setSelectedType('ijazah');
  };
  const onUploadTranscript = () => {
    setVisible(true);
    setSelectedType('transcript');
  };

  const uploadSimpleFile = async e => {
    const fd = new FormData();
    const today = new Date();
    const date =
      today.getFullYear() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getDate();
    '/' + today.getHours() + ':' + today.getMinutes();

    fd.append('file', {
      uri: e.path,
      type: e.mime,
      name: `${selectedType}_${date}`,
      data: e.data,
    });
    fd.append('module', selectedType);
    try {
      const token = await storage.load({key: 'token'});
      const uploadedFile = await fetch(`${HOST_URL}/upload`, {
        method: 'POST',
        headers: {
          token: token.token,
          'Content-Type': 'multipart/form-data',
        },
        body: fd,
      }).then(res => res.json());
      console.log('RESPONSE = ', uploadedFile);
    } catch (err) {
      console.log('ERR = ', err);
    }
  };
  const loadingFunc =
    selectedType === 'ijazah' ? setLoadingIjazah : setLoadingTranscript;
  const onSelectCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });
      toggleOverlay();
      loadingFunc(true);
      await uploadSimpleFile(image);
      loadingFunc(false);
      console.log('IMAGE = ', image);
    } catch (e) {
      console.log('ERROR', e);
      loadingFunc(false);
    }
  };
  const onSelectGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });
      toggleOverlay();
      loadingFunc(true);
      await uploadSimpleFile(image);
      loadingFunc(false);
      console.log('IMAGE = ', image);
    } catch (e) {
      console.log('ERROR', e);
      loadingFunc(false);
    }
  };
  const labelStyle = {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9CA3AF',
  };
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: '#ffffff',
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
          {detailCertificate.majorStudy}
        </Text>
        <View style={{marginTop: 24}}>
          <Text style={labelStyle}>NIM</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {detailCertificate.nim}
          </Text>
          <Text style={labelStyle}>Lulus</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {detailCertificate.graduationYear}
          </Text>
          <Text style={labelStyle}>No. Ijazah</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {detailCertificate.noIjazah}
          </Text>
        </View>
        {detailCertificate.legalize && detailCertificate.legalize.status === 0 && (
          <View style={{flex: 1, paddingTop: 24}}>
            <Card
              containerStyle={{
                margin: 0,
                borderStyle: 'dashed',
                borderRadius: 1,
              }}>
              <Card.Title>Upload Ijazah</Card.Title>
              <Card.Divider />
              <Button
                title="Upload"
                buttonStyle={{
                  backgroundColor: '#047857',
                }}
                loading={isLoadingIjazah}
                onPress={onUploadIjazah}
              />
            </Card>
            <Card
              containerStyle={{
                margin: 0,
                marginTop: 24,
                borderStyle: 'dashed',
                borderRadius: 1,
              }}>
              <Card.Title>Upload Transkrip</Card.Title>
              <Card.Divider />
              <Button
                title="Upload"
                buttonStyle={{
                  backgroundColor: '#047857',
                }}
                loading={isLoadingTranscript}
                onPress={onUploadTranscript}
              />
            </Card>
          </View>
        )}
      </ScrollView>
      <View style={{padding: 24}}>
        <Button
          title="Legalisir"
          buttonStyle={{
            backgroundColor: '#047857',
          }}
          loading={isLoading}
          onPress={onLegalisir}
        />
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{padding: 24}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 24}}>
          Upload Foto
        </Text>
        <Button
          type="clear"
          buttonStyle={{color: '#047857'}}
          title="Ambil Foto"
          onPress={onSelectCamera}
        />
        <Button
          type="clear"
          buttonStyle={{color: '#047857'}}
          title="Ambil Galeri"
          onPress={onSelectGallery}
        />
      </Overlay>
    </SafeAreaView>
  );
};

export default DetailCertificate;
