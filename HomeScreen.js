/**
 * src/screens/HomeScreen.js
 * The main landing screen of the app.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Settings, Share2, ChevronsRight } from 'lucide-react-native';
import { getVerseOfTheDay } from './gita_data';
import { Card } from './common';

const HomeScreen = ({ navigation, lastRead }) => {
  const [verseOfTheDay, setVerseOfTheDay] = useState(null);

  useEffect(() => {
    setVerseOfTheDay(getVerseOfTheDay());
  }, []);

  if (!verseOfTheDay) {
    return (
      <View style={[styles.screenContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text>Loading your daily wisdom...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={{ paddingBottom: 80 }}>
      <View style={styles.homeHeader}>
        <View>
            <Text style={styles.appName}>Pocket Gita</Text>
            <Text style={styles.appSubtitle}>Your daily spiritual guide</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Settings color="#4A5568" size={24} />
        </TouchableOpacity>
      </View>

      <Card style={styles.verseCard}>
        <Text style={styles.cardTitle}>Verse of the Day (BG {verseOfTheDay.chapter_number}.{verseOfTheDay.shloka_number})</Text>
        <Text style={styles.verseHeading}>Sanskrit Slokam</Text>
        <Text style={styles.sanskritText}>{verseOfTheDay.sanskrit_iast}</Text>
        <Text style={styles.verseHeading}>Telugu Slokam</Text>
        <Text style={styles.translationText}>{verseOfTheDay.telugu_translation_1}</Text>
        <Text style={styles.verseHeading}>అర్థం</Text>
        <Text style={styles.explanationText}>{verseOfTheDay.plain_telugu_explanation}</Text>
        <View style={styles.cardActions}>
            <TouchableOpacity><Text style={styles.linkText}>View Commentary</Text></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Share2 color="#D97706" size={22} /></TouchableOpacity>
        </View>
      </Card>

      {lastRead && (
          <Card>
            <Text style={styles.sectionTitle}>Continue Reading</Text>
            <Text style={styles.bodyText}>You left off at Chapter {lastRead.chapter_number}, Verse {lastRead.shloka_number}.</Text>
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('ReadingView', { initialShloka: lastRead })}>
              <Text style={styles.linkText}>Jump Back In</Text>
              <ChevronsRight color="#D97706" size={18} />
            </TouchableOpacity>
          </Card>
      )}
    </ScrollView>
  );
};

// Styles for this screen
const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: '#F9FAFB' },
    homeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 32 },
    appName: { fontSize: 28, fontWeight: 'bold', fontFamily: 'serif', color: '#1E3A8A' },
    appSubtitle: { fontSize: 16, color: '#6B7280' },
    iconButton: { padding: 8 },
    verseCard: { backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderWidth: 1 },
    cardTitle: { fontFamily: 'serif', fontSize: 18, color: '#92400E', marginBottom: 8 },
    verseHeading: { fontSize: 12, fontWeight: 'bold', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: 4, marginTop: 10 },
    sanskritText: { fontFamily: 'serif', fontSize: 20, color: '#1E3A8A', lineHeight: 32 },
    translationText: { fontSize: 16, color: '#4A5568', lineHeight: 24 },
    explanationText: { fontSize: 15, color: '#3F3F46', lineHeight: 22, fontStyle: 'italic', marginTop: 4 },
    cardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, borderTopWidth: 1, borderTopColor: '#FDE68A', paddingTop: 12 },
    linkText: { fontSize: 14, fontWeight: '600', color: '#D97706' },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 4 },
    bodyText: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
    linkButton: { flexDirection: 'row', alignItems: 'center', marginTop: 8 }
});

export default HomeScreen;

