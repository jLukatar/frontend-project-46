/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import parse from './fileParse.js';
import generateDiff from './generateDiff.js';
import outputDiff from './formatters/index.js';

const fileParse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileExtension = path.extname(filepath);
  return parse(fs.readFileSync(absolutePath), fileExtension);
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const file1 = fileParse(filepath1);
  const file2 = fileParse(filepath2);
  const diff = generateDiff(file1, file2);
  return outputDiff(diff, outputFormat);
};

export default genDiff;

