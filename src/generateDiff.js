import _ from 'lodash';

const generateObjectChanged = (key, valueBefore, valueAfter, status) => (
  {
    key, valueBefore, valueAfter, status,
  });
const generateObjectPlain = (key, value, status) => {
  if (status === 'nested') {
    return {
      key, children: value, status,
    };
  }
  return {
    key, value, status,
  };
};

const genDiff = (objBefore, objAfter) => {
  const beforeKeys = Object.keys(objBefore);
  const afterKeys = Object.keys(objAfter);
  const mergedKeys = _.sortBy(_.union(beforeKeys, afterKeys));
  return mergedKeys
    .map((key) => {
      if (!Object.hasOwn(objBefore, key)) {
        return generateObjectPlain(key, objAfter[key], 'added');
      }
      if (!Object.hasOwn(objAfter, key)) {
        return generateObjectPlain(key, objBefore[key], 'removed');
      }
      if (_.isPlainObject(objBefore[key]) && _.isPlainObject(objAfter[key])) {
        const value = genDiff(objBefore[key], objAfter[key]);
        return generateObjectPlain(key, value, 'nested');
      }
      if (objBefore[key] === objAfter[key]) {
        return generateObjectPlain(key, objBefore[key], 'unchanged');
      }
      return generateObjectChanged(key, objBefore[key], objAfter[key], 'changed');
    });
};

export default genDiff;
