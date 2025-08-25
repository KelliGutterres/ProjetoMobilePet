import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Animal } from '../types/Animal';
import { uploadImageToSupabase } from '../utils/imageUpload';

type Props = {
  onSubmit: (animal: Animal) => void;
  initialData?: Animal;
};

export const AnimalForm = ({ onSubmit, initialData }: Props) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [imageUri, setImageUri] = useState<string | undefined>(initialData?.imageUrl);

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    location: '',
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada para localização');
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        const geocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (geocode.length > 0) {
          const place = geocode[0];
          const address =
            `${place.street ?? ''} ${place.streetNumber ?? ''}`.trim() +
            `, ${place.city ?? ''}` +
            `, ${place.region ?? ''}`;
          setLocation(address);
        } else {
          setLocation(`${loc.coords.latitude.toFixed(5)}, ${loc.coords.longitude.toFixed(5)}`);
        }
      } catch (error) {
        Alert.alert('Erro ao obter endereço da localização');
        setLocation('');
      }
    };

    if (!initialData) fetchLocation();
  }, []);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão para acessar galeria negada');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const validateFields = () => {
    const newErrors = {
      name: name.trim() === '' ? 'Nome é obrigatório' : '',
      description: description.trim() === '' ? 'Descrição é obrigatória' : '',
      location: location.trim() === '' ? 'Localização é obrigatória' : '',
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.description && !newErrors.location;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    let imageUrl = initialData?.imageUrl;
    if (imageUri && imageUri !== initialData?.imageUrl) {
      imageUrl = await uploadImageToSupabase(imageUri);
    }

    onSubmit({ name, description, location, imageUrl });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
        }}
        style={styles.input}
        placeholderTextColor="#888"
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
        }}
        style={styles.input}
        placeholderTextColor="#888"
      />
      {errors.description ? <Text style={styles.error}>{errors.description}</Text> : null}

      <TextInput
        placeholder="Localização"
        value={location}
        onChangeText={(text) => {
          setLocation(text);
          if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
        }}
        style={styles.input}
        placeholderTextColor="#888"
      />
      {errors.location ? <Text style={styles.error}>{errors.location}</Text> : null}

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={handlePickImage}>
        <Text style={styles.buttonText}>Selecionar imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: '#eee',
  },
  button: {
    backgroundColor: '#f57c00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});