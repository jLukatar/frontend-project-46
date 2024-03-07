import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFileContent = (filename) => {
  const filePath = path.resolve(process.cwd(), '__fixtures__', filename);
  return fs.readFileSync(filePath, 'utf-8');
};

const testCases = [
  ['stylish', 'file1.json', 'file2.json', 'diffStringStylish.txt'],
  ['plain', 'file1.json', 'file2.json', 'diffStringPlain.txt'],
  ['json', 'file1.json', 'file2.json', 'diffJSON.txt'],
  ['stylish', 'file1.yaml', 'file2.yaml', 'diffStringStylish.txt'],
  ['plain', 'file1.yaml', 'file2.yaml', 'diffStringPlain.txt'],
  ['json', 'file1.yaml', 'file2.yaml', 'diffJSON.txt'],
];

describe('genDiff', () => {
  const getFixturePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
  test.each(testCases)(
    'should generate diff in %s format for files %s and %s',
    (outputFormat, file1, file2, expectedFile) => {
      const filepath1 = getFixturePath(file1);
      const filepath2 = getFixturePath(file2);

      const result = genDiff(filepath1, filepath2, outputFormat);
      const expected = readFileContent(expectedFile);

      expect(result).toBe(expected);
    },
  );
});
