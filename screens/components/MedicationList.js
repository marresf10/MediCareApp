import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const MedicationList = ({ medications, onMarkAsTaken }) => {
  const [takenMedications, setTakenMedications] = useState({});

  const handlePress = (id, medication) => {
    setTakenMedications((prevState) => ({
      ...prevState,
      [id]: true,
    }));

    onMarkAsTaken(id, medication);

    Toast.show({
      type: 'success',
      text1: 'Medicamento tomado',
      position: 'bottom',
    });

    setTimeout(() => {
      setTakenMedications((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }, 4000);
  };

  const formatTime = (hour, minute) => {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };

  const renderItem = ({ item }) => {
    const isTaken = takenMedications[item._id];
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.medicationName}>{item.nombre}</Text>
          <Text style={styles.medicationTime}>Dosis: {item.proxima_toma ? `${new Date(item.proxima_toma.fecha).toLocaleDateString()} ${formatTime(item.proxima_toma.hora, item.proxima_toma.minuto)}` : 'N/A'}</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkButton, isTaken && styles.checkButtonTaken]}
          onPress={() => handlePress(item._id, item)}
        >
          <Ionicons name="checkmark" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicationTime: {
    fontSize: 14,
    color: '#888',
  },
  checkButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DCD6D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonTaken: {
    backgroundColor: '#00A86B',
  },
});

export default MedicationList;
