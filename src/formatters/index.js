import makePlain from './makePlain.js';
import makeStylish from './makeStylish.js';

const getDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(diff);
    case 'plain':
      return makePlain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Wrong output format: ${format}`);
  }
};

export default getDiff;
