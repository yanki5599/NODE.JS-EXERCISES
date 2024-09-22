const {
  printFile,
  printWordCount,
  printFileReverse,
  printUniqueWords,
  printUniqWordsCount,
  printUniqueWordsCap,
  printUniqueWordsLongerThan,
  printUniqWordsVowelsCount,
} = require("./utils");

const filePath = "./data/data.txt";

printFile(filePath);

printWordCount(filePath);

printFileReverse(filePath);

printUniqueWords(filePath);

printUniqWordsCount(filePath);

printUniqueWordsCap(filePath);

printUniqueWordsLongerThan(filePath, 5);

printUniqWordsVowelsCount(filePath, "output.txt");
