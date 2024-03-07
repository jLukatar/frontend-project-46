import _ from 'lodash';

const genDiff = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const mergedKeys = _.sortBy(_.union(data1Keys, data2Keys));

  return mergedKeys.map((key) => {
    if (!Object.hasOwnProperty.call(data1, key)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }
    if (!Object.hasOwnProperty.call(data2, key)) {
      return {
        key,
        value: data1[key],
        type: 'removed',
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = genDiff(data1[key], data2[key]);
      return {
        key,
        children,
        type: 'nested',
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        key,
        value: data1[key],
        type: 'unchanged',
      };
    }
    return {
      key,
      value1: data1[key],
      value2: data2[key],
      type: 'changed',
    };
  });
};

export default genDiff;
