import _ from 'lodash';

const genDiff = (data1, data2) => {
  const space = ' ';
  const mergedData = { ...data1, ...data2 };
  const keys = Object.keys(mergedData);
  const result = _.orderBy(keys).map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return `${space.repeat(2)}+ ${key}: ${data2[key]}`;
    }
    if (!Object.hasOwn(data2, key)) {
      return `${space.repeat(2)}- ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `${space.repeat(2)}- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `${space.repeat(4)}${key}: ${data1[key]}`;
  });
  const output = `{\n${result.join('\n')}\n}`;
  return output;
};

export default genDiff;
