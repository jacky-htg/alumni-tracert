import React from 'react';
import {CheckBox} from 'react-native-elements';

const CheckBoxClear = ({...props}) => {
  const containerCheckBox = {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    paddingHorizontal: 0,
    marginTop: 0,
    marginBottom: -10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  };
  return (
    <CheckBox
      {...props}
      containerStyle={containerCheckBox}
      checkedIcon={props.isMultiple ? 'check-square-o' : 'dot-circle-o'}
      uncheckedIcon={props.isMultiple ? 'square-o' : 'circle-o'}
    />
  );
};

export default CheckBoxClear;
