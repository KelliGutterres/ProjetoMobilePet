import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AnimalForm } from '../components/AnimalForm';
import { AnimalService } from '../services/AnimalService';
import { Animal } from '../types/Animal';

export default function RegisterLostAnimalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const animal = (route.params as { animal?: Animal })?.animal;

  const handleSubmit = async (data: Animal) => {
    try {
      if (animal?.id) {
        await AnimalService.update('lost_animals', animal.id, data);
        Alert.alert('Animal atualizado!');
      } else {
        await AnimalService.create('lost_animals', data);
        Alert.alert('Animal perdido cadastrado!');
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro ao salvar');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={30} color="#31BAA9" />
        <Text style={styles.title}>{animal ? 'Editar Animal Perdido' : 'Cadastrar Animal Perdido'}</Text>
      </View>
      <AnimalForm onSubmit={handleSubmit} initialData={animal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#31BAA9',
    marginTop: 4,
    textAlign: 'center',
  },
});