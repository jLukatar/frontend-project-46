/* eslint-disable import/extensions */
import fs from 'fs/promises';
import outputDiff from '../src/formatters/index.js';
import sampleInput from '../__fixtures__/diffArray.js';
import expectedJsonOutput from '../__fixtures__/diffJSON.json';

describe('outputDiff', () => {
  it('should format the diff in stylish format', async () => {
    const formattedDiff = outputDiff(sampleInput, 'stylish');
    expect(formattedDiff).toBe(await fs.readFile('./__fixtures__/diffStringStylish.txt', 'utf-8'));
  });

  it('should format the diff in plain format', async () => {
    const formattedDiff = outputDiff(sampleInput, 'plain');
    expect(formattedDiff).toBe(await fs.readFile('./__fixtures__/diffStringPlain.txt', 'utf-8'));
  });

  it('should format the diff in JSON format', async () => {
    const formattedDiff = outputDiff(sampleInput, 'json');
    expect(formattedDiff).toBe(JSON.stringify(expectedJsonOutput));
  });
});
