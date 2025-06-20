import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';

// --- DATA IMPORT ---
// We now import our data processing functions from the separate helper file.
// Make sure you've created 'src/data/gita_data.js'.
import { getVerseOfTheDay, allChapters } from './gita_data.js';

// --- ICONS ---
import { Home, BookOpen, Search, Library, Mic2, Settings, Share2 } from 'lucide-react-native';

// --- MOCK DATA for features not in the JSON ---
// We'll keep this for playlists, meditations, and bookmarks as placeholders.
const MOCK_DATA = {
  playlists: [
    { id: 1, title: "Overcoming Fear", icon: "🛡️" },
    { id: 2, title: "Finding Inner Peace", icon: "🕊️" },
    { id: 3, title: "The Path of Action", icon: "🔥" },
    { id: 4, title: "Understanding the Self", icon: "🧘" },
  ],
  meditations: [
      { id: 1, title: "Meditation on the Self", duration: "10 min" },
      { id: 2, title: "Focusing on the Breath", duration: "5 min" },
      { id: 3, title: "Cultivating Detachment", duration: "12 min" },
  ],
  bookmarks: [
      { id: "2.47", text: "You have a right to perform your prescribed duties...", note: "A reminder about selfless action." },
      { id: "18.66", text: "Abandon all varieties of religion and just surrender unto Me...", note: "The ultimate instruction." }
  ]
};


// --- SCREEN COMPONENTS ---

const HomeScreen = () => {
  // Use state to hold the verse of the day, so it can be updated.
  const [verseOfTheDay, setVerseOfTheDay] = useState(null);

  // useEffect runs once when the component mounts to get a random verse.
  useEffect(() => {
    setVerseOfTheDay(getVerseOfTheDay());
  }, []);

  const { playlists } = MOCK_DATA;

  // Show a loading text if the verse hasn't been loaded yet.
  if (!verseOfTheDay) {
    return (
      <View style={[styles.screenContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text>Loading your daily wisdom...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.homeHeader}>
        <View>
            <Text style={styles.appName}>Pocket Gita</Text>
            <Text style={styles.appSubtitle}>Your daily spiritual guide</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Settings color="#4A5568" size={24} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.verseCard]}>
        <Text style={styles.cardTitle}>Verse of the Day (BG {verseOfTheDay.chapter_number}.{verseOfTheDay.shloka_number})</Text>
        <Text style={styles.sanskritText}>{verseOfTheDay.sanskrit_devanagari}</Text>
        <Text style={styles.translationText}>{verseOfTheDay.english_translation}</Text>
        <View style={styles.cardActions}>
            <TouchableOpacity><Text style={styles.linkText}>View Commentary</Text></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Share2 color="#D97706" size={22} /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Continue Reading</Text>
        <Text style={styles.bodyText}>Explore the 18 chapters of the Gita.</Text>
        <TouchableOpacity><Text style={[styles.linkText, {marginTop: 8}]}>Go to Read Tab →</Text></TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <Text style={styles.appName}>Thematic Playlists</Text>
        <View style={styles.playlistGrid}>
          {playlists.map(p => (
            <TouchableOpacity key={p.id} style={styles.playlistItem}>
              <Text style={{fontSize: 24}}>{p.icon}</Text>
              <Text style={styles.playlistTitle}>{p.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const ReadScreen = () => {
  // The `allChapters` data is now imported and pre-processed from our helper file.
  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={[styles.appName, { paddingHorizontal: 16, marginBottom: 16}]}>Bhagavad Gita</Text>
      {allChapters.map(chapter => (
        <TouchableOpacity key={chapter.id} style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.chapterLabel}>Chapter {chapter.id}</Text>
                    <Text style={styles.chapterTitle}>{chapter.title}</Text>
                    <Text style={styles.chapterSummary}>{chapter.shlokas.length} verses</Text>
                </View>
                <View style={styles.chapterArrow}>
                    <Text style={{color: '#995B00', fontWeight: 'bold'}}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const SearchScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.searchBarContainer}>
                <Search color="#9CA3AF" size={22} style={{position: 'absolute', left: 16, zIndex: 1}}/>
                <TextInput
                    placeholder="Search for 'karma', 'detachment'..."
                    style={styles.searchInput}
                    placeholderTextColor="#9CA3AF"
                />
            </View>
            <View style={{padding: 16}}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                {/* Search results will appear here */}
            </View>
        </View>
    )
};

const LibraryScreen = () => {
    const [activeTab, setActiveTab] = useState('bookmarks');

    return (
        <View style={styles.screenContainer}>
            <Text style={[styles.appName, { padding: 16 }]}>My Library</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('bookmarks')}>
                    <View style={[styles.tabButton, activeTab === 'bookmarks' && styles.activeTab]}>
                      <Text style={[styles.tabText, activeTab === 'bookmarks' && styles.activeTabText]}>Bookmarks</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('notes')}>
                    <View style={[styles.tabButton, activeTab === 'notes' && styles.activeTab]}>
                      <Text style={[styles.tabText, activeTab === 'notes' && styles.activeTabText]}>Notes</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{padding: 16}}>
                {activeTab === 'bookmarks' && MOCK_DATA.bookmarks.map(b => (
                    <View key={b.id} style={[styles.card, {marginBottom: 12}]}>
                        <Text style={styles.sectionTitle}>BG {b.id}</Text>
                        <Text style={styles.bodyText} numberOfLines={1}>{b.text}</Text>
                    </View>
                ))}
                 {activeTab === 'notes' && MOCK_DATA.bookmarks.map(b => (
                    <View key={b.id} style={[styles.card, {marginBottom: 12}]}>
                        <Text style={styles.sectionTitle}>BG {b.id}</Text>
                        <View style={styles.noteContainer}>
                          <Text style={styles.bodyText}>"{b.note}"</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
};

const ListenScreen = () => {
    return (
        <ScrollView style={styles.screenContainer}>
            <Text style={[styles.appName, { padding: 16 }]}>Listen & Meditate</Text>
            <View style={{paddingHorizontal: 16}}>
                <Text style={[styles.appName, {fontSize: 22, marginBottom: 12}]}>Guided Meditations</Text>
                {MOCK_DATA.meditations.map(m => (
                    <TouchableOpacity key={m.id} style={[styles.card, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                        <View>
                            <Text style={styles.sectionTitle}>{m.title}</Text>
                            <Text style={styles.bodyText}>{m.duration}</Text>
                        </View>
                        <TouchableOpacity style={styles.playButton}>
                            <Mic2 color="#FFF" size={20} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreen />;
      case 'Read': return <ReadScreen />;
      case 'Search': return <SearchScreen />;
      case 'Library': return <LibraryScreen />;
      case 'Listen': return <ListenScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        {renderScreen()}
      </View>
      <View style={styles.navBar}>
        {[{name: 'Home', icon: Home}, {name: 'Read', icon: BookOpen}, {name: 'Search', icon: Search}, {name: 'Library', icon: Library}, {name: 'Listen', icon: Mic2}].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <TouchableOpacity key={item.name} onPress={() => setActiveTab(item.name)} style={[styles.navButton, isActive && styles.navButtonActive]}>
              <Icon color={isActive ? '#D97706' : '#4A5568'} size={24} />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  screenContainer: { flex: 1, backgroundColor: '#F9FAFB' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginHorizontal: 16, marginBottom: 12},
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  appName: { fontSize: 28, fontWeight: 'bold', fontFamily: 'serif', color: '#1E3A8A' },
  appSubtitle: { fontSize: 16, color: '#6B7280' },
  iconButton: { padding: 8 },
  verseCard: { backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderWidth: 1, marginTop: 8 },
  cardTitle: { fontFamily: 'serif', fontSize: 18, color: '#92400E', marginBottom: 8 },
  sanskritText: { fontFamily: 'serif', fontSize: 20, color: '#1E3A8A', lineHeight: 32, marginBottom: 12 },
  translationText: { fontSize: 16, color: '#4A5568', lineHeight: 24, marginBottom: 16 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  linkText: { fontSize: 14, fontWeight: '600', color: '#D97706' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 4 },
  bodyText: { fontSize: 14, color: '#6B7280' },
  playlistGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  playlistItem: { width: '48%', backgroundColor: '#FFF', borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  playlistTitle: { fontWeight: '600', color: '#4A5568', marginTop: 8, textAlign: 'center' },
  chapterLabel: { fontSize: 14, fontWeight: 'bold', color: '#D97706' },
  chapterTitle: { fontSize: 18, fontFamily: 'serif', color: '#1E40AF', marginTop: 2 },
  chapterSummary: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  chapterArrow: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FEF3C7', justifyContent: 'center', alignItems: 'center' },
  searchBarContainer: { padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', justifyContent: 'center'},
  searchInput: { height: 50, backgroundColor: '#F3F4F6', borderRadius: 25, paddingLeft: 45, fontSize: 16 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tabButton: { paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabText: { fontSize: 18, fontWeight: '600', color: '#6B7280' },
  activeTab: { borderBottomColor: '#D97706' },
  activeTabText: { color: '#D97706' },
  noteContainer: { backgroundColor: '#FFFBEB', padding: 12, borderRadius: 8, marginTop: 8 },
  playButton: { backgroundColor: '#D97706', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingVertical: 8, paddingBottom: 16 },
  navButton: { alignItems: 'center', justifyContent: 'center', padding: 8, borderRadius: 8, width: 64, height: 64 },
  navButtonActive: { backgroundColor: '#FEF3C7' },
  navLabel: { fontSize: 12, color: '#4A5568', marginTop: 4 },
  navLabelActive: { color: '#D97706', fontWeight: '600' }
});