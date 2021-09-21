import React, {useState, useEffect, useMemo} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Text,
  Card,
  Chip,
  Overlay,
  Divider,
} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {HOST_URL} from '../../services/tracert';
import storage from '../utils/storage';
import CheckBoxClear from '../components/CheckBoxClear';
import {createLegalize, getLegalizeList} from '../utils/actions';
import {downloadFile} from '../utils/storage';

const DetailCertificate = ({navigation}) => {
  const {isLogin, detailCertificate} = useSelector(state => ({
    isLogin: state.isLogin,
    detailCertificate: state.detailCertificate,
  }));
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingIjazah, setLoadingIjazah] = useState(false);
  const [isLoadingTranscript, setLoadingTranscript] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [ijazahFile, setIjazahFile] = useState(null);
  const [transcriptFile, setTranscriptFile] = useState(null);
  const [selectedLegalisirType, setSelectedLegalisirType] =
    useState('e-legalisir');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onLegalisir = async () => {
    try {
      setLoading(true);
      const param = {
        certificateId: detailCertificate.id,
        ijazahPath: ijazahFile.fileUrl,
        transcriptPath: transcriptFile.fileUrl,
        isOffline: selectedLegalisirType !== 'e-legalisir',
      };
      console.log('PARAM = ', param);
      await dispatch(createLegalize(param));
      setLoading(false);
      dispatch(getLegalizeList());
      navigation.goBack();
    } catch (e) {
      setLoading(false);
    }
  };
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
      const result = await fetch(`${HOST_URL}/upload`, {
        method: 'POST',
        headers: {
          token: token.token,
          'Content-Type': 'multipart/form-data',
        },
        body: fd,
      }).then(res => res.json());
      return result;
    } catch (err) {
      console.log('ERR = ', err);
    }
  };
  const loadingFunc =
    selectedType === 'ijazah' ? setLoadingIjazah : setLoadingTranscript;
  const setImageFunc =
    selectedType === 'ijazah' ? setIjazahFile : setTranscriptFile;
  const uploadSelectedImage = async image => {
    toggleOverlay();
    loadingFunc(true);
    const fileUploaded = await uploadSimpleFile(image);
    setImageFunc({...image, fileUrl: fileUploaded.path});
    loadingFunc(false);
  };
  const onSelectCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });
      uploadSelectedImage(image);
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
      uploadSelectedImage(image);
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
  const status = useMemo(() =>
    detailCertificate.legalize ? detailCertificate.legalize.status : null,
  );
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
        {status === 0 && (
          <View style={{flex: 1, paddingTop: 24}}>
            <Card
              containerStyle={{
                margin: 0,
                borderStyle: 'dashed',
                borderRadius: 1,
              }}>
              <Card.Title>Upload Ijazah</Card.Title>
              <Card.Divider />
              {ijazahFile && (
                <Card.Image
                  style={{marginBottom: 12}}
                  source={{uri: ijazahFile.path}}
                />
              )}
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
              {transcriptFile && (
                <Card.Image
                  style={{marginBottom: 12}}
                  source={{uri: transcriptFile.path}}
                />
              )}
              <Button
                title="Upload"
                buttonStyle={{
                  backgroundColor: '#047857',
                }}
                loading={isLoadingTranscript}
                onPress={onUploadTranscript}
              />
            </Card>
            <View style={{paddingTop: 12}}>
              <CheckBoxClear
                title="E-Legalisir"
                checked={selectedLegalisirType === 'e-legalisir'}
                onPress={() => setSelectedLegalisirType('e-legalisir')}
              />
              <CheckBoxClear
                title="Legalisir Cap Basah"
                checked={selectedLegalisirType === 'offline'}
                onPress={() => setSelectedLegalisirType('offline')}
              />
            </View>
          </View>
        )}
        {status === 3 && (
          <View style={{flex: 1, paddingTop: 24}}>
            {detailCertificate.legalize.isOffline ? (
              <View
                style={{
                  backgroundColor: '#ECFDF5',
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderTopColor: '#10B981',
                  borderTopWidth: 1,
                  borderBottomColor: '#10B981',
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{
                    marginVertical: 12,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#10B981',
                    textAlign: 'center',
                  }}>
                  Dokumen telah diverifikasi dan disetujui, silahkan untuk
                  mengambil dokumen ijazah atau transkrip nilai yang sudah
                  disetujui di kampus
                </Text>
              </View>
            ) : (
              <>
                <Card
                  containerStyle={{
                    margin: 0,
                  }}>
                  <Card.Title>Ijazah</Card.Title>
                  <Card.Divider />
                  <Card.Image
                    style={{marginBottom: 12}}
                    source={{
                      uri: `https://bpodt-staging.oss-ap-southeast-5.aliyuncs.com/${detailCertificate.legalize.ijazah}`,
                    }}
                  />
                  <Button
                    title="Download"
                    buttonStyle={{
                      backgroundColor: '#047857',
                    }}
                    loading={isLoadingIjazah}
                    onPress={() =>
                      downloadFile(detailCertificate.legalize.ijazahSigned)
                    }
                  />
                </Card>
                <Card
                  containerStyle={{
                    margin: 0,
                    marginTop: 24,
                  }}>
                  <Card.Title>Transkrip</Card.Title>
                  <Card.Divider />
                  <Card.Image
                    style={{marginBottom: 12}}
                    source={{
                      uri: `https://bpodt-staging.oss-ap-southeast-5.aliyuncs.com/${detailCertificate.legalize.transcript}`,
                    }}
                  />
                  <Button
                    title="Download"
                    buttonStyle={{
                      backgroundColor: '#047857',
                    }}
                    loading={isLoadingTranscript}
                    onPress={() =>
                      downloadFile(detailCertificate.legalize.transcriptSigned)
                    }
                  />
                </Card>
              </>
            )}
          </View>
        )}
      </ScrollView>
      {status === 0 && (
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
      )}
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
