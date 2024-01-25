import fs from 'fs/promises';
import path from 'path';
import genDiff from '../src/index.js';

const readFileContent = async (filename) => {
  const filePath = path.resolve(process.cwd(), '__fixtures__', filename);
  return fs.readFile(filePath, 'utf-8');
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
  test.each(testCases)(
    'should generate diff in %s format for files %s and %s',
    async (outputFormat, file1, file2, expectedFile) => {
      const filepath1 = `./__fixtures__/${file1}`;
      const filepath2 = `./__fixtures__/${file2}`;

      const result = await genDiff(filepath1, filepath2, outputFormat);
      const expected = await readFileContent(expectedFile);

      expect(result).toBe(expected);
    },
  );
});
