import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ onDayPress }) => {
  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={{
        '2024-07-16': { marked: true },
        '2024-07-17': { marked: true },
        '2024-07-18': { marked: true },
      }}
      theme={{
        todayTextColor: '#00adf5',
        arrowColor: '#00adf5',
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CalendarComponent;
