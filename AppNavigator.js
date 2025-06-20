/**
 * src/navigation/AppNavigator.js
 * This file defines the entire navigation structure of the app.
 * The fix ensures that data is correctly passed down to child screens.
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, BookOpen, Library } from 'lucide-react-native';

// Import Screens
import HomeScreen from './HomeScreen';
import ReadScreen from './ReadScreen';
import LibraryScreen from './LibraryScreen';
import ChapterScreen from './ChapterScreen';
import ReadingView from './ReadingView';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- Main Tab Navigator ---
const MainTabNavigator = ({ bookmarks, lastRead }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let IconComponent = Home;
        if (route.name === 'Read') IconComponent = BookOpen;
        else if (route.name === 'Library') IconComponent = Library;
        return <IconComponent color={color} size={24} />;
      },
      tabBarActiveTintColor: '#D97706',
      tabBarInactiveTintColor: '#4A5568',
      tabBarStyle: { backgroundColor: '#FFFFFF', borderTopWidth: 1 },
      tabBarLabelStyle: { fontWeight: '600' }
    })}
  >
    <Tab.Screen name="Home">
        {props => <HomeScreen {...props} lastRead={lastRead} />}
    </Tab.Screen>
    <Tab.Screen name="Read" component={ReadScreen} />
    <Tab.Screen name="Library">
        {props => <LibraryScreen {...props} bookmarks={bookmarks} />}
    </Tab.Screen>
  </Tab.Navigator>
);

// --- Main App Stack Navigator (Root Navigator) ---
// This is the root navigator that handles all screens. It allows navigating
// from the tab bar to full-screen pages like the chapter details.
const AppNavigator = ({ bookmarks, setBookmarks, lastRead, setLastRead }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs">
        {/* Pass state and setters to the main tab navigator */}
        {props => <MainTabNavigator {...props} bookmarks={bookmarks} lastRead={lastRead} />}
      </Stack.Screen>
      <Stack.Screen name="Chapter" component={ChapterScreen} />
      <Stack.Screen name="ReadingView">
        {/* Pass all necessary state management functions to the ReadingView */}
        {props => <ReadingView {...props} bookmarks={bookmarks} setBookmarks={setBookmarks} setLastRead={setLastRead} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
