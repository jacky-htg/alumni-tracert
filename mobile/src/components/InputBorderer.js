import React from 'react';
import {Input} from 'react-native-elements';

const InputBorderer = ({...props}) => {
  const inputStyle = {
    paddingHorizontal: 0,
  };
  const inputContStyle = {
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    height: 52,
  };
  if (props.minBorder) {
    inputContStyle.marginBottom = -20;
  }
  return (
    <Input
      labelStyle={{color: '#9CA3AF'}}
      containerStyle={inputStyle}
      inputContainerStyle={inputContStyle}
      {...props}
    />
  );
};

export default InputBorderer;
