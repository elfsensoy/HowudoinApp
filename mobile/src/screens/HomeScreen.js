import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwt_token');
      await AsyncStorage.removeItem('user_email');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HowudoinApp!</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Friends Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Friends')}>
          <Icon name="people" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Friends</Text>
        </TouchableOpacity>

        {/* Manage Groups Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageGroups')}>
          <Icon name="people-circle" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Manage Groups</Text>
        </TouchableOpacity>

        {/* Group Messaging Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GroupMessaging')}>
          <Icon name="chatbubbles" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Group Messaging</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  logoutText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
