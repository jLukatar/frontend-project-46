import fs from 'fs';
// eslint-disable-next-line import/extensions
import fileParse from '../src/fileParse';

describe('fileParse', () => {
  const sharedObject = {
    key1: 'value1',
    key2: 'value2',
  };

  test('should parse yaml file correctly', () => {
    const parsedObject = fileParse(fs.readFileSync('__fixtures__/yamlFile.yaml'), '.yaml');
    expect(parsedObject).toEqual(sharedObject);
  });

  test('should parse yml file correctly', () => {
    const parsedObject = fileParse(fs.readFileSync('__fixtures__/ymlFile.yml'), '.yml');
    expect(parsedObject).toEqual(sharedObject);
  });

  test('should parse JSON file correctly', () => {
    const parsedObject = fileParse(fs.readFileSync('__fixtures__/jsonFile.json'), '.json');
    expect(parsedObject).toEqual(sharedObject);
  });
});
