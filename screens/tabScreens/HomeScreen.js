import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MedicationList from '../components/MedicationList';
import CalendarComponent from '../components/CalendarComponent';

const HomeScreen = () => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetch('https://medicare-api-khaki.vercel.app/api/medicamentos')
      .then(response => response.json())
      .then(data => {
        setMedications(data);
        filterMedications(data, selectedDate);
      })
      .catch(error => {
        console.error('Error fetching medications:', error);
      });
  }, [selectedDate]);

  const filterMedications = (medicationsList, date) => {
    const filtered = medicationsList.filter(medication => {
      if (medication.proxima_toma && medication.proxima_toma.fecha) {
        const nextDoseDate = new Date(medication.proxima_toma.fecha).toISOString().split('T')[0];
        return nextDoseDate === date;
      }
      return false;
    });
    setFilteredMedications(filtered);
  };

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);
    filterMedications(medications, selectedDate);
  };

  const calculateNextDose = (proximaToma, frecuencia) => {
    const { fecha, hora, minuto } = proximaToma;
    const { horas, minutos } = frecuencia;

    // Crear un objeto Date con la fecha y hora actuales de la próxima toma
    let nextDoseDate = new Date(fecha);
    nextDoseDate.setUTCHours(hora, minuto, 0, 0);

    // Sumar la frecuencia a la próxima toma
    nextDoseDate.setUTCHours(nextDoseDate.getUTCHours() + horas[0]);
    nextDoseDate.setUTCMinutes(nextDoseDate.getUTCMinutes() + minutos[0]);

    // Obtener los nuevos valores de fecha, hora y minuto
    const newDate = nextDoseDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const newHour = nextDoseDate.getUTCHours();
    const newMinute = nextDoseDate.getUTCMinutes();

    return {
        fecha: newDate,
        hora: newHour,
        minuto: newMinute
    };
  };

  const handleMarkAsTaken = (id, medication) => {
    const currentDoseDate = new Date(medication.proxima_toma.fecha);
    currentDoseDate.setUTCHours(medication.proxima_toma.hora);
    currentDoseDate.setUTCMinutes(medication.proxima_toma.minuto);

    const nextDose = calculateNextDose({
      fecha: currentDoseDate.toISOString().split('T')[0],
      hora: currentDoseDate.getUTCHours(),
      minuto: currentDoseDate.getUTCMinutes(),
    }, medication.frecuencia);

    // Update the medication's next dose while preserving frequency
    const updatedMedication = {
      ...medication,
      proxima_toma: {
        fecha: nextDose.fecha,
        hora: nextDose.hora,
        minuto: nextDose.minuto,
      }
    };

    // Update medication on the server
    fetch(`https://medicare-api-khaki.vercel.app/api/medicamentos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMedication),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Medication updated:', data);
      // Refresh medications list
      fetch('https://medicare-api-khaki.vercel.app/api/medicamentos')
        .then(response => response.json())
        .then(data => {
          setMedications(data);
          filterMedications(data, selectedDate);
        })
        .catch(error => {
          console.error('Error refreshing medications:', error);
        });
    })
    .catch(error => {
      console.error('Error updating medication:', error);
    });
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
          <MedicationList medications={filteredMedications} onMarkAsTaken={handleMarkAsTaken} />
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listContainer: {
    flex: 1,
  },
});

export default HomeScreen;
