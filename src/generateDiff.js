import _ from 'lodash';

const genDiff = (firstObj, secondObj) => {
  const beforeKeys = Object.keys(firstObj);
  const afterKeys = Object.keys(secondObj);
  const mergedKeys = _.sortBy(_.union(beforeKeys, afterKeys));

  return mergedKeys.map((key) => {
    if (!Object.hasOwnProperty.call(firstObj, key)) {
      return {
        key,
        value: secondObj[key],
        status: 'added',
      };
    }
    if (!Object.hasOwnProperty.call(secondObj, key)) {
      return {
        key,
        value: firstObj[key],
        status: 'removed',
      };
    }
    if (_.isPlainObject(firstObj[key]) && _.isPlainObject(secondObj[key])) {
      const value = genDiff(firstObj[key], secondObj[key]);
      return {
        key,
        children: value,
        status: 'nested',
      };
    }
    if (_.isEqual(firstObj[key], secondObj[key])) {
      return {
        key,
        value: firstObj[key],
        status: 'unchanged',
      };
    }
    return {
      key,
      firstObjValue: firstObj[key],
      secondObjValue: secondObj[key],
      status: 'changed',
    };
  });
};

export default genDiff;
