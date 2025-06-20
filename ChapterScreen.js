import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { allChapters } from './gita_data';
import { Card } from './common';
import { ArrowLeft, BookOpen } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChapterScreen = ({ route, navigation }) => {
  const { chapterId } = route.params;
  const chapter = allChapters.find(c => c.id === chapterId);

  const [lastReadShloka, setLastReadShloka] = useState(null);

  useEffect(() => {
    const loadLastRead = async () => {
      const stored = await AsyncStorage.getItem(`lastRead-${chapterId}`);
      if (stored) {
        setLastReadShloka(JSON.parse(stored));
      }
    };
    loadLastRead();
  }, [chapterId]);

  const handleStartReading = () => {
    const initialShloka = lastReadShloka || chapter.shlokas[0];
    navigation.navigate('ReadingView', { initialShloka });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color="#374151" size={24} />
        </TouchableOpacity>
        <View>
          <Text style={styles.chapterLabel}>Chapter {chapter.id}</Text>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity style={styles.readButton} onPress={handleStartReading}>
          <BookOpen color="#FFF" size={20} />
          <Text style={styles.readButtonText}>
            {lastReadShloka ? `Continue from Verse ${lastReadShloka.shloka_number}` : 'Start Reading'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.screenContainer}>
        {chapter.shlokas.map(shloka => (
          <TouchableOpacity key={shloka.shloka_number} onPress={() => navigation.navigate('ReadingView', { initialShloka: shloka })}>
            <Card>
              <Text style={styles.verseNumber}>Verse {shloka.shloka_number}</Text>
              <Text style={styles.verseText}>{shloka.telugu_translation_1}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', backgroundColor: 'white'
  },
  backButton: { marginRight: 16, padding: 4 },
  chapterLabel: { fontSize: 14, fontWeight: 'bold', color: '#D97706' },
  chapterTitle: { fontSize: 22, fontFamily: 'serif', color: '#1E40AF', fontWeight: '600' },
  readButton: {
    flexDirection: 'row', backgroundColor: '#16A34A',
    paddingVertical: 12, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000', shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 4
  },
  readButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  screenContainer: { flex: 1, paddingHorizontal: 16 },
  verseNumber: { fontWeight: 'bold', color: '#6B7280', marginBottom: 4 },
  verseText: { fontSize: 16, color: '#374151', lineHeight: 24 }
});

export default ChapterScreen;
