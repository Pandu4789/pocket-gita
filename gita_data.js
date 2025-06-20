// Load the JSON file statically for offline-first apps (no backend needed)
import shlokas from './assets/bhagavad_gita_shlokas.json';

// Chapter names mapped by number
export const chapterNames = {
  1: "Arjuna Vishada Yoga",
  2: "Sankhya Yoga",
  3: "Karma Yoga",
  4: "Jnana Karma Sannyasa Yoga",
  5: "Karma Sannyasa Yoga",
  6: "Dhyana Yoga",
  7: "Jnana Vijnana Yoga",
  8: "Akshara Brahma Yoga",
  9: "Raja Vidya Raja Guhya Yoga",
  10: "Vibhuti Yoga",
  11: "Vishvarupa Darshana Yoga",
  12: "Bhakti Yoga",
  13: "Kshetra-Kshetrajna Vibhaga Yoga",
  14: "Gunatraya Vibhaga Yoga",
  15: "Purushottama Yoga",
  16: "Daivasura Sampad Vibhaga Yoga",
  17: "Shraddhatraya Vibhaga Yoga",
  18: "Moksha Sannyasa Yoga"
};

// Group shlokas by chapter for easy access
export const allChapters = shlokas.reduce((acc, shloka) => {
  const chapterNum = shloka.chapter_number;
  let chapter = acc.find(c => c.id === chapterNum);

  if (!chapter) {
    chapter = {
      id: chapterNum,
      title: chapterNames[chapterNum] || `Chapter ${chapterNum}`,
      shlokas: []
    };
    acc.push(chapter);
  }

  chapter.shlokas.push(shloka);
  return acc;
}, []);

// Flat list of all shlokas
export const flatShlokas = shlokas;

// Get random verse of the day
export const getVerseOfTheDay = () => {
  if (!flatShlokas || flatShlokas.length === 0) {
    return {
      sanskrit_iast: "Data not loaded.",
      telugu_translation_1: "Please check if the JSON file is correctly placed.",
      plain_telugu_explanation: "Please check if the JSON file is correctly placed.",
      chapter_number: 0,
      shloka_number: 0
    };
  }
  const randomIndex = Math.floor(Math.random() * flatShlokas.length);
  return flatShlokas[randomIndex];
};
