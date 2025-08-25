import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Menu } from 'react-native-paper';
import { AnimalService } from '../services/AnimalService';
import { Animal } from '../types/Animal';

export default function FoundAnimalsScreen() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [filtroLocation, setFiltroLocation] = useState('');
  const navigation = useNavigation();

  const loadAnimals = async () => {
    try {
      const data = await AnimalService.getAll('found_animals');
      setAnimals(data);
    } catch (e) {
      Alert.alert('Erro ao carregar dados');
    }
  };

  const handleDelete = async (id: string) => {
    await AnimalService.delete('found_animals', id);
    await loadAnimals();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadAnimals);
    return unsubscribe;
  }, [navigation]);

  const filteredAnimals = animals.filter((animal) =>
    animal.location?.toLowerCase().includes(filtroLocation.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animais Encontrados</Text>

      <View style={styles.filterContainer}>
        <TextInput
          placeholder="Filtrar por localização"
          value={filtroLocation}
          onChangeText={setFiltroLocation}
          style={styles.filterInput}
        />
      </View>

      <FlatList
        data={filteredAnimals}
        keyExtractor={(item) => item.id!}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            )}

            <View style={styles.cardContent}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>{item.description}</Text>
                <Text style={styles.cardText}>{item.location}</Text>
              </View>

              <Menu
                visible={menuVisible === item.id}
                onDismiss={() => setMenuVisible(null)}
                anchor={
                  <TouchableOpacity onPress={() => setMenuVisible(item.id!)}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                  </TouchableOpacity>
                }
              >
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(null);
                    (navigation as any).navigate('RegisterFound', { animal: item });
                  }}
                  title="Editar"
                />
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(null);
                    handleDelete(item.id!);
                  }}
                  title="Excluir"
                />
              </Menu>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterFound' as never)}
        style={styles.fab}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#f57c00',
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f57c00',
    borderRadius: 30,
    padding: 16,
    elevation: 4,
  },
});