import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from './src/screens/HomeScreen';
import GroupMessagingPage from './src/screens/GroupMessagingPage';
import ManageGroupsScreen from './src/screens/GroupCreationScreen';
import FriendsScreen from './src/screens/FriendScreen';
import FriendChatScreen from './src/screens/FriendChatScreen';
import FriendRequestScreen from './src/screens/FriendRequestScreen';
import FriendsListScreen from './src/screens/FriendsListScreen';
import LoginScreen from './src/screens/LoginScreen';
import PendingFriendRequestsScreen from './src/screens/PendingFriendRequestsScreen';
import GroupDetailsScreen from './src/screens/GroupDetailsScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import GroupChatScreen from './src/screens/GroupChatScreen';


// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Define all screens */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GroupMessaging" component={GroupMessagingPage} />
        <Stack.Screen name="ManageGroups" component={ManageGroupsScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="FriendChat" component={FriendChatScreen} />
        <Stack.Screen name="FriendRequests" component={FriendRequestScreen} />
        <Stack.Screen name="FriendsList" component={FriendsListScreen} />
        <Stack.Screen name="PendingFriendRequests" component={PendingFriendRequestsScreen} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
        <Stack.Screen name="Messaging" component={MessagingScreen} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
