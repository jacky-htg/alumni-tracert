import React from 'react';
import {CheckBox} from 'react-native-elements';

const CheckBoxClear = ({...props}) => {
  const containerCheckBox = {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 8,
  };
  return (
    <CheckBox
      {...props}
      containerStyle={containerCheckBox}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
    />
  );
};

export default CheckBoxClear;
