import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

export default storage;

const checkPermission = async () => {
  // Function to check the platform
  // If Platform is Android then check for permissions.

  if (Platform.OS === 'ios') {
    Promise.resolve();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted.');
        // Start downloading
        Promise.resolve();
      } else {
        console.log('Error', 'Storage Permission Not Granted');
        Promise.reject();
      }
    } catch (err) {
      console.log('++++' + err);
      Promise.reject();
    }
  }
};

const getFileExtention = fileUrl => {
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};

export const downloadFile = async url => {
  await checkPermission();
  let date = new Date();
  let FILE_URL = url;
  let file_ext = getFileExtention(FILE_URL);
  file_ext = '.' + file_ext[0];
  const {config, fs} = RNFetchBlob;
  let RootDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path:
        RootDir +
        '/file_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        file_ext,
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };
  const result = await config(options).fetch('GET', FILE_URL);
  console.log('res -> ', JSON.stringify(result));
  return result;
};
