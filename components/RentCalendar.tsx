import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

const RentCalendar = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<any>({});

  const onDayPress = (day: DateObject) => {
    const date = day.dateString;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      setMarkedDates({ [date]: { startingDay: true, endingDay: true, color: 'blue', textColor: 'white' } });
    } else if (startDate && !endDate) {
      if (date < startDate) { 
        setStartDate(date);
        setEndDate(null);
        setMarkedDates({ [date]: { startingDay: true, endingDay: true, color: 'blue', textColor: 'white' } });  
      } else {
        setEndDate(date);
      }

    
      const range: any= {};
      const s = new Date(startDate);
      const e = new Date(date);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        const ds = d.toISOString().split('T')[0];
        range[ds] = {
          color: 'blue',
          textColor: 'white',
          startingDay: ds === startDate,
          endingDay: ds === date,
        };
      }
      setMarkedDates(range);
    }
  };

  return (
    <View style={{ marginVertical: 5 }}>
      <Calendar
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
      <Text style={{ marginTop: 5,
                     marginBottom: 5,
                     fontSize: 16, 
                     textAlign: 'center' ,
                     color: 'black',
                     fontWeight: 'bold'
                    }}>
        {startDate && `Start Date: ${startDate}`}{'\n'}
        {endDate && `End Date: ${endDate}`}
      </Text>
    </View>
  );
};

export default RentCalendar;
