function reverseString(string) {
  return string.split("").reverse().join("");
}

function words(string) {
  return string.trim().split(/\s+/);
}

function countWords(string) {
  return words(string).length;
}

function UniqueWords(string) {
  return Array.from(new Set(words(string)));
}

function UniqueWordsCount(string) {
  return UniqueWords(string).length;
}

function Capitalize(wordsArr) {
  return wordsArr.map((word) => word.toUpperCase(word));
}

function FilterLongerThan(wordArr, lengthBound) {
  return wordArr.filter((word) => word.length > lengthBound);
}

function UniqVowelsCount(words) {
  const vowels = ["a", "e", "i", "o", "u"];
  const vowelsCount = [];

  words.forEach((w) => {
    vowelsCount.push({
      word: w,
      vowelCount: vowels
        .map((v) => +w.includes(v))
        .reduce((acc, curr) => acc + curr),
    });
  });
  return vowelsCount;
}

module.exports = {
  reverseString,
  countWords,
  UniqueWords,
  UniqueWordsCount,
  Capitalize,
  FilterLongerThan,
  UniqVowelsCount,
};
