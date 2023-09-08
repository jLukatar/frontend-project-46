/* eslint-disable import/extensions */
import makePlain from './makePlain.js';
import makeStylish from './makeStylish.js';

const outputDiff = (diff, format) => {
  if (format === 'stylish') {
    return makeStylish(diff);
  }
  if (format === 'plain') {
    return makePlain(diff);
  }
  throw new Error(`Wrong output format: ${format}`);
};

export default outputDiff;
