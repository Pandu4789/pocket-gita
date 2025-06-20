/**
 * App.js
 * This is the main entry point of the application. It sets up the navigation
 * container and manages top-level state like bookmarks and last read verse.
 */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [lastRead, setLastRead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data from device storage when the app starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedBookmarks = await AsyncStorage.getItem('gitaBookmarks');
        if (savedBookmarks !== null) {
          setBookmarks(JSON.parse(savedBookmarks));
        }
        const savedLastRead = await AsyncStorage.getItem('gitaLastRead');
        if (savedLastRead !== null) {
          setLastRead(JSON.parse(savedLastRead));
        }
      } catch (e) {
        console.error("Failed to load data from storage", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save bookmarks to device storage whenever they change
  useEffect(() => {
    const saveBookmarks = async () => {
        try {
            await AsyncStorage.setItem('gitaBookmarks', JSON.stringify(bookmarks));
        } catch (e) {
            console.error("Failed to save bookmarks", e);
        }
    };
    if(!isLoading) {
        saveBookmarks();
    }
  }, [bookmarks, isLoading]);

  // Save the last read verse to device storage when it changes
  useEffect(() => {
    const saveLastRead = async () => {
        try {
            if (lastRead) {
                await AsyncStorage.setItem('gitaLastRead', JSON.stringify(lastRead));
            }
        } catch(e) {
            console.error("Failed to save last read verse", e);
        }
    };
    if(!isLoading) {
        saveLastRead();
    }
  }, [lastRead, isLoading]);
  
  if (isLoading) {
      return null; // Or a loading spinner component
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator 
          bookmarks={bookmarks} 
          setBookmarks={setBookmarks} 
          lastRead={lastRead}
          setLastRead={setLastRead}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
