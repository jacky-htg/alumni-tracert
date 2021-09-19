import React from 'react';
import {Button, Text} from 'react-native-elements';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

const SearchDropDown = ({label, ...props}) => {
  return (
    <>
      {label && (
        <Text
          style={{
            marginBottom: 10,
            fontWeight: 'bold',
            fontSize: 16,
            color: '#9CA3AF',
          }}>
          {label}
        </Text>
      )}
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={true}
        textInputProps={{
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            borderRadius: 8,
            backgroundColor: '#fff',
            paddingLeft: 4,
            borderWidth: 1,
            borderColor: '#9CA3AF',
            height: 52,
            marginBottom: 20,
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,
          top: 12,
          alignSelfs: 'center',
          backgroundColor: '#fff',
        }}
        {...props}
      />
    </>
  );
};

export default SearchDropDown;
