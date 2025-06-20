/**
 * src/screens/LibraryScreen.js
 * Displays the list of bookmarked verses.
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Card } from './common';

const LibraryScreen = ({ navigation, bookmarks }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.screenTitle}>My Library</Text>
      <ScrollView style={styles.screenContainer}>
        {bookmarks.length > 0 ? (
          bookmarks.map(shloka => (
            <TouchableOpacity key={`${shloka.chapter_number}-${shloka.shloka_number}`} onPress={() => navigation.navigate('ReadingView', { initialShloka: shloka })}>
              <Card>
                <Text style={styles.bookmarkTitle}>BG {shloka.chapter_number}.{shloka.shloka_number}</Text>
                <Text style={styles.bookmarkText} numberOfLines={2}>{shloka.telugu_translation_1}</Text>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You haven't bookmarked any verses yet.</Text>
            <Text style={styles.emptySubText}>Tap the bookmark icon while reading to save a verse here.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
    screenContainer: { flex: 1 },
    screenTitle: { fontSize: 32, fontWeight: 'bold', fontFamily: 'serif', color: '#1E3A8A', padding: 16, paddingTop: 24 },
    bookmarkTitle: { fontWeight: 'bold', color: '#D97706' },
    bookmarkText: { fontSize: 16, color: '#374151', lineHeight: 24, marginTop: 4 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
    emptyText: { fontSize: 18, fontWeight: '600', color: '#6B7280' },
    emptySubText: { fontSize: 14, color: '#9CA3AF', marginTop: 8 }
});

export default LibraryScreen;
