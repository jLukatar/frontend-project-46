import path from 'path';
import process from 'process';
// eslint-disable-next-line import/extensions
import fileParse from '../src/fileParse.js';

describe('fileParse', () => {
  const sharedObject = {
    key1: 'value1',
    key2: 'value2',
  };

  test('should parse yaml file correctly', () => {
    const parsedObject = fileParse(path.resolve(process.cwd(), '__tests__/testFiles/yamlFile.yaml'));
    expect(parsedObject).toEqual(sharedObject);
  });

  test('should parse yml file correctly', () => {
    const parsedObject = fileParse(path.resolve(process.cwd(), '__tests__/testFiles/ymlFile.yml'));
    expect(parsedObject).toEqual(sharedObject);
  });

  test('should parse JSON file correctly', () => {
    const parsedObject = fileParse(path.resolve(process.cwd(), '__tests__/testFiles/jsonFile.json'));
    expect(parsedObject).toEqual(sharedObject);
  });
});
