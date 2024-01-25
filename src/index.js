/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import parse from './getData.js';
import generateDiff from './generateDiff.js';
import outputDiff from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileExtension = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const fileExtension = getFileExtension(filepath);
  return parse(fs.readFileSync(absolutePath), fileExtension);
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const dataSet1 = getData(filepath1);
  const dataSet2 = getData(filepath2);
  const diff = generateDiff(dataSet1, dataSet2);
  return outputDiff(diff, outputFormat);
};

export default genDiff;
