import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MedicationList from '../components/MedicationList';
import CalendarComponent from '../components/CalendarComponent';

const HomeScreen = () => {
  const [medications, setMedications] = useState([]);

  const handleDayPress = (day) => {
    // Aquí puedes obtener los medicamentos del día seleccionado
    // Por ahora, usaremos datos de ejemplo
    const exampleMedications = [
      { id: 1, name: 'Paracetamol', nextDose: '08:00 AM', image: 'https://example.com/paracetamol.png' },
      { id: 2, name: 'Ibuprofeno', nextDose: '12:00 PM', image: 'https://example.com/ibuprofeno.png' },
    ];
    setMedications(exampleMedications);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>MediCare</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.calendarContainer}>
          <CalendarComponent onDayPress={handleDayPress} />
        </View>
        <View style={styles.listContainer}>
          <MedicationList medications={medications} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    backgroundColor: '#A8DADC',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  topBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  calendarContainer: {
    //flex: 1, 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listContainer: {
    flex: 1,
  },
});

export default HomeScreen;
