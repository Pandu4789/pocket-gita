import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, ArrowRight, Bookmark as BookmarkIcon, Share2 as ShareIcon } from 'lucide-react-native';
import { flatShlokas, chapterNames } from './gita_data';

const screenHeight = Dimensions.get('window').height;

const ReadingView = ({ route, navigation, bookmarks = [], setBookmarks = () => {}, setLastRead = () => {} }) => {
  const { initialShloka } = route.params || {};

  const initialIndex = useMemo(() => {
    if (!Array.isArray(flatShlokas) || !initialShloka) return 0;
    const index = flatShlokas.findIndex(
      s => s.chapter_number === initialShloka.chapter_number &&
           s.shloka_number === initialShloka.shloka_number
    );
    return index > -1 ? index : 0;
  }, [initialShloka]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentShloka = flatShlokas[currentIndex];

  useEffect(() => {
    if (currentShloka) setLastRead(currentShloka);
  }, [currentShloka]);

  const handleNavigate = (direction) => {
    if (direction === 'next' && currentIndex < flatShlokas.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleShare = async () => {
    try {
      const textToShare = 
        `శ్లోకం ${currentShloka.chapter_number}.${currentShloka.shloka_number}\n\n` +
        `${currentShloka.sanskrit_iast}\n\n` +
        `📖 తెలుగు అనువాదం:\n${currentShloka.telugu_translation_1}\n\n` +
        `🧘🏻 వివరణ:\n${currentShloka.plain_telugu_explanation}`;
      await Share.share({ message: textToShare });
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  const isBookmarked = bookmarks.some(
    b => b.chapter_number === currentShloka.chapter_number &&
         b.shloka_number === currentShloka.shloka_number
  );

  const toggleBookmark = () => {
    setBookmarks(prev =>
      isBookmarked
        ? prev.filter(b =>
            !(b.chapter_number === currentShloka.chapter_number && b.shloka_number === currentShloka.shloka_number)
          )
        : [...prev, currentShloka]
    );
  };

  if (!flatShlokas?.length || !currentShloka) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Could not load verse data.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.errorLink}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color="#374151" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Chapter {currentShloka.chapter_number}: {chapterNames[currentShloka.chapter_number] || 'Untitled'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
            <BookmarkIcon
              color={isBookmarked ? '#D97706' : '#9CA3AF'}
              size={24}
              fill={isBookmarked ? '#FEF3C7' : 'none'}
            />
          </TouchableOpacity>

          <Text style={styles.verseNumber}>
            Verse {currentShloka.chapter_number}.{currentShloka.shloka_number}
          </Text>

          <ScrollView
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}
            style={{ maxHeight: screenHeight * 0.65 }}
          >
            <Text style={styles.sanskritText}>{currentShloka.sanskrit_iast}</Text>
            <Text style={styles.translationText}>{currentShloka.telugu_translation_1}</Text>
            <Text style={styles.explanationText}>{currentShloka.plain_telugu_explanation}</Text>
          </ScrollView>

          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <ShareIcon color="#6B7280" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => handleNavigate('prev')}
          disabled={currentIndex === 0}
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
        >
          <ArrowLeft color="white" />
        </TouchableOpacity>
        <Text style={styles.progressText}>{currentIndex + 1} / {flatShlokas.length}</Text>
        <TouchableOpacity
          onPress={() => handleNavigate('next')}
          disabled={currentIndex === flatShlokas.length - 1}
          style={[styles.navButton, currentIndex === flatShlokas.length - 1 && styles.disabledButton]}
        >
          <ArrowRight color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFF7ED',
    justifyContent: 'space-between',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5B21B6',
    flex: 1,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#EAB308',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    position: 'relative',
  },
  verseNumber: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#D97706',
    marginBottom: 12,
    fontSize: 16,
  },
  sanskritText: {
    fontFamily: 'serif',
    fontSize: 26,
    color: '#1F2937',
    lineHeight: 38,
    textAlign: 'center',
    marginVertical: 10,
  },
  translationText: {
    fontSize: 20,
    color: '#4B5563',
    lineHeight: 30,
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  explanationText: {
    fontSize: 17,
    color: '#6B7280',
    lineHeight: 26,
    fontStyle: 'italic',
    marginTop: 16,
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFF7ED',
    borderTopWidth: 1,
    borderColor: '#FDE68A',
  },
  navButton: {
    backgroundColor: '#4B5563',
    padding: 14,
    borderRadius: 50,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 50,
  },
  shareButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#E0F2FE',
    borderRadius: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
  },
  errorLink: {
    fontSize: 16,
    color: '#2563EB',
    marginTop: 16,
  },
});

export default ReadingView;
