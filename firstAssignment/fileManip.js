const { log } = require("console");
const fs = require("fs");
const {
  reverseString,
  countWords,
  UniqueWords,
  UniqueWordsCount,
  Capitalize,
  FilterLongerThan,
  UniqVowelsCount,
} = require("./lodashImplements");

function printFile(path) {
  try {
    console.log(fs.readFileSync(path, "utf-8"));
  } catch (err) {
    console.error(err);
  }
}

function printWordCount(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(countWords(data));
  } catch (err) {
    console.error(err);
  }
}

function printFileReverse(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(reverseString(data));
  } catch (err) {
    console.error(err);
  }
}
function printUniqueWords(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(UniqueWords(data));
  } catch (err) {
    console.error(err);
  }
}

function printUniqWordsCount(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(UniqueWordsCount(data));
  } catch (err) {
    console.error(err);
  }
}

function printUniqueWordsCap(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(Capitalize(UniqueWords(data)));
  } catch (err) {
    console.error(err);
  }
}

function printUniqueWordsLongerThan(path, number) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(FilterLongerThan(UniqueWords(data), number));
  } catch (err) {
    console.error(err);
  }
}

function printUniqWordsVowelsCount(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(UniqVowelsCount(UniqueWords(data)));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  printFile,
  printWordCount,
  printFileReverse,
  printUniqueWords,
  printUniqWordsCount,
  printUniqueWordsCap,
  printUniqueWordsLongerThan,
  printUniqWordsVowelsCount,
};
