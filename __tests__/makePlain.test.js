/* eslint-disable import/extensions */
import fs from 'fs/promises';
import makePlain from '../src/formatters/makePlain.js';
import sampleInput from '../__fixtures__/diffArray.js';

describe('makePlain', () => {
  test('should convert diff object to plain string format', async () => {
    const expectedOutput = await fs.readFile('./__fixtures__/diffStringPlain.txt', 'utf-8');
    const result = makePlain(sampleInput);
    expect(result).toEqual(expectedOutput);
  });
});