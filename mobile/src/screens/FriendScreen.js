import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FriendsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends Options</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FriendRequests')}>
        <Icon name="person-add" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Friend Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PendingFriendRequests')}>
        <Icon name="time" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Pending Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FriendsList')}>
        <Icon name="people" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Friends List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
});

export default FriendsScreen;
