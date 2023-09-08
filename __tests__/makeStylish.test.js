/* eslint-disable import/extensions */
import fs from 'fs/promises';
import makeStylish from '../src/formatters/makeStylish.js';
import sampleInput from '../__fixtures__/diffArray.js';

describe('makeStylish', () => {
  test('should convert diff object to stylish string format', async () => {
    const expectedOutput = await fs.readFile('./__fixtures__/diffStringStylish.txt', 'utf-8');
    const result = makeStylish(sampleInput);
    expect(result).toEqual(expectedOutput);
  });
});
