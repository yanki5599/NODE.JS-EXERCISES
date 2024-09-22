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

function print(data, outputFilePath = null) {
  if (outputFilePath)
    fs.appendFileSync(
      outputFilePath,
      JSON.stringify(data, null, 4) + "\n",
      "utf-8"
    );
  else console.log(data);
}

function printFile(path, outputFilePath = null) {
  printManipData(path, (data) => data, outputFilePath);
}

function printWordCount(path, outputFilePath = null) {
  printManipData(path, (data) => countWords(data), outputFilePath);
}

function printFileReverse(path, outputFilePath = null) {
  printManipData(path, (data) => reverseString(data), outputFilePath);
}
function printUniqueWords(path, outputFilePath = null) {
  printManipData(path, (data) => UniqueWords(data), outputFilePath);
}

function printUniqWordsCount(path, outputFilePath = null) {
  printManipData(path, (data) => UniqueWordsCount(data), outputFilePath);
}

function printUniqueWordsCap(path, outputFilePath = null) {
  printManipData(path, (data) => Capitalize(UniqueWords(data)), outputFilePath);
}

function printUniqueWordsLongerThan(path, number, outputFilePath = null) {
  printManipData(
    path,
    (data) => FilterLongerThan(UniqueWords(data), number),
    outputFilePath
  );
}

function printUniqWordsVowelsCount(path, outputFilePath = null) {
  printManipData(
    path,
    (data) => UniqVowelsCount(UniqueWords(data)),
    outputFilePath
  );
}

function printManipData(path, manipFunc, outputFilePath) {
  try {
    const content = fs.readFileSync(path, "utf-8");
    print(manipFunc(content), outputFilePath);
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
