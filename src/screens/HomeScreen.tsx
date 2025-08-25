import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FoundAnimalsScreen from './FoundAnimalsScreen';
import LostAnimalsScreen from './LostAnimalsScreen';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<'lost' | 'found'>('found');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={32} color="#f57c00" />
        <Text style={styles.title}>PetFinder</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSelectedTab('lost')}
          style={[
            styles.tabButton,
            selectedTab === 'lost' && styles.tabButtonActive,
          ]}
        >
          <Ionicons name="paw" size={20} color={selectedTab === 'lost' ? '#fff' : '#f57c00'} />
          <Text style={selectedTab === 'lost' ? styles.tabLabelActive : styles.tabLabel}>
            Perdidos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('found')}
          style={[
            styles.tabButton,
            selectedTab === 'found' && styles.tabButtonActive,
          ]}
        >
          <Ionicons name="search" size={20} color={selectedTab === 'found' ? '#fff' : '#f57c00'} />
          <Text style={selectedTab === 'found' ? styles.tabLabelActive : styles.tabLabel}>
            Encontrados
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'lost' ? <LostAnimalsScreen /> : <FoundAnimalsScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f57c00',
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    paddingVertical: 10,
    backgroundColor: '#fff3e0',
    borderBottomWidth: 1,
    borderColor: '#fbc02d',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  tabButtonActive: {
    backgroundColor: '#f57c00',
  },
  tabLabel: {
    marginLeft: 6,
    fontSize: 14,
    color: '#f57c00',
  },
  tabLabelActive: {
    marginLeft: 6,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});