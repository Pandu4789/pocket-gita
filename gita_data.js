import shlokas from './assets/bhagavad_gita_shlokas.json';

// A simple map to get the proper names for the chapters.
const chapterNames = {
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


// --- Process Data for Chapter List ---
// The original JSON is a flat list of all shlokas.
// For the "Read" screen, we need to group these shlokas by chapter.
const chapters = shlokas.reduce((acc, shloka) => {
  const chapterNum = shloka.chapter_number;
  // Find if a chapter object already exists in our accumulator array 'acc'
  let chapter = acc.find(c => c.id === chapterNum);
  
  // If the chapter object doesn't exist, create it.
  if (!chapter) {
    chapter = {
      id: chapterNum,
      // Use the chapter name from our map, or a default name.
      title: chapterNames[chapterNum] || `Chapter ${chapterNum}`,
      shlokas: []
    };
    acc.push(chapter);
  }
  
  // Add the current shloka to the appropriate chapter
  chapter.shlokas.push(shloka);
  
  return acc;
}, []);


// --- Export Processed and Raw Data ---
export const allShlokas = shlokas;
export const allChapters = chapters;

// Function to get a random shloka for "Verse of the Day"
export const getVerseOfTheDay = () => {
  if (!allShlokas || allShlokas.length === 0) {
    return {
        sanskrit_devanagari: "Data not loaded.",
        english_translation: "Please check if the JSON file is correctly placed.",
        chapter_number: 0,
        shloka_number: 0
    };
  }
  const randomIndex = Math.floor(Math.random() * allShlokas.length);
  return allShlokas[randomIndex];
};
