import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { logout } from '../services/AnimalService';

export default function LogoutScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
      } catch (error) {
        Alert.alert('Erro ao sair', (error as Error).message);
      }
    };

    doLogout();
  }, []);

  return null;
}