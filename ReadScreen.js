/**
 * src/screens/ReadScreen.js
 * Displays the list of all chapters.
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { allChapters } from './gita_data';
import { Card } from './common';
import { ChevronRight } from 'lucide-react-native';

const ReadScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Bhagavad Gita</Text>
        {allChapters.map(chapter => (
            <TouchableOpacity key={chapter.id} onPress={() => navigation.navigate('Chapter', { chapterId: chapter.id })}>
                <Card>
                    <View style={styles.chapterRow}>
                        <View style={{ flex: 1, paddingRight: 8 }}>
                            <Text style={styles.chapterLabel}>Chapter {chapter.id}</Text>
                            <Text style={styles.chapterTitle}>{chapter.title}</Text>
                            <Text style={styles.chapterSummary}>{chapter.shlokas.length} verses</Text>
                        </View>
                        <View style={styles.chapterArrow}>
                            <ChevronRight color="#995B00" size={24} />
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        ))}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
    screenContainer: { flex: 1 },
    screenTitle: { fontSize: 32, fontWeight: 'bold', fontFamily: 'serif', color: '#1E3A8A', padding: 16, paddingTop: 24 },
    chapterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    chapterLabel: { fontSize: 14, fontWeight: 'bold', color: '#D97706' },
    chapterTitle: { fontSize: 18, fontFamily: 'serif', color: '#1E40AF', marginTop: 2, fontWeight: '600' },
    chapterSummary: { fontSize: 14, color: '#6B7280', marginTop: 4 },
    chapterArrow: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FEF3C7', justifyContent: 'center', alignItems: 'center' },
});

export default ReadScreen;
