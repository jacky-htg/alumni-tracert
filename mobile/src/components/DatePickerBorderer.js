import React from 'react';
import DatePicker from 'react-native-datepicker';

const DatePickerBorderer = ({width, ...props}) => {
  return (
    <DatePicker
      style={{
        width,
        height: 52,
        borderRadius: 8,
        borderWidth: 0,
      }}
      customStyles={{
        dateInput: {
          // marginLeft: 36,
        },
        // ... You can check the source to find the other keys.
      }}
      {...props}
    />
  );
};

export default DatePickerBorderer;
