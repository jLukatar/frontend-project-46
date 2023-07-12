// eslint-disable-next-line import/extensions
import genDiff from '../src/generateDifference.js';

describe('genDiff', () => {
  test('should return {\n\n} string if both input objects are empty', () => {
    const data1 = {};
    const data2 = {};
    const expectedResult = '{\n\n}';
    expect(genDiff(data1, data2)).toBe(expectedResult);
  });

  test('should return + key: value object if first input object is empty', () => {
    const data1 = {};
    const data2 = { key: 'value' };
    const expectedResult = '{\n  + key: value\n}';
    expect(genDiff(data1, data2)).toBe(expectedResult);
  });

  test('should return - key: value object if second input object is empty', () => {
    const data1 = { key: 'value' };
    const data2 = {};
    const expectedResult = '{\n  - key: value\n}';
    expect(genDiff(data1, data2)).toBe(expectedResult);
  });

  test('should return merged object with added keys if one input object has additional keys', () => {
    const data1 = { key1: 'value1' };
    const data2 = { key1: 'value1', key2: 'value2' };
    const expectedResult = '{\n    key1: value1\n  + key2: value2\n}';
    expect(genDiff(data1, data2)).toBe(expectedResult);
  });

  test('should return merged object with removed keys if one input object has missing keys', () => {
    const data1 = { key1: 'value1', key2: 'value2' };
    const data2 = { key1: 'value1' };
    const expectedResult = '{\n    key1: value1\n  - key2: value2\n}';
    expect(genDiff(data1, data2)).toBe(expectedResult);
  });

  test('should return merged object with modified keys if values differ', () => {
    const data1 = { key: 'value1' };
    const data2 = { key: 'value2' };
    const expectedResult = '{\n  - key: value1\n  + key: value2\n}';
    expect(genDiff(data1, data2)).toBe(expectedResult);
  });
});
