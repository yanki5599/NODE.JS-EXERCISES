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

printUniqueWordsCap(filePath, "output.txt");

printUniqueWordsLongerThan(filePath, 5, "output.txt");

printUniqWordsVowelsCount(filePath, "output.txt");
