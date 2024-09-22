const _ = require("lodash");

function reverseString(string) {
  return _.reverse(string.split("")).join("");
}

function countWords(string) {
  return _.words(string).length;
}

function UniqueWords(string) {
  return _.uniq(_.words(string));
}

function UniqueWordsCount(string) {
  return UniqueWords(string).length;
}

function Capitalize(wordsArr) {
  return wordsArr.map((word) => _.upperCase(word));
}

function FilterLongerThan(wordArr, lengthBound) {
  return _.filter(wordArr, (word) => word.length > lengthBound);
}

function UniqVowelsCount(words) {
  const vowels = ["a", "e", "i", "o", "u"];
  const vowelsCount = [];

  _.forEach(words, (w) => {
    vowelsCount.push({
      word: w,
      vowelCount: _.sum(_.map(vowels, (v) => +_.includes(w, v))),
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
