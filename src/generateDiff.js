const generateObjectChanged = (key, valueBefore, valueAfter, status, path) => (
  {
    key, valueBefore, valueAfter, status, path: path.join('.'),
  });
const generateObjectPlain = (key, value, status, path) => (
  {
    key, value, status, path: path.join('.'),
  });

const genDiff = (objBefore, objAfter, path = []) => {
  const beforeKeys = Object.keys(objBefore);
  const afterKeys = Object.keys(objAfter);
  const mergedKeys = [...beforeKeys, ...afterKeys]
    .filter((key, index, array) => array.indexOf(key) === index);

  return mergedKeys
    .map((key) => {
      const currentPath = [...path, key];

      if (!Object.hasOwn(objBefore, key)) {
        return generateObjectPlain(key, objAfter[key], 'added', currentPath);
      }
      if (!Object.hasOwn(objAfter, key)) {
        return generateObjectPlain(key, objBefore[key], 'deleted', currentPath);
      }
      if (typeof objBefore[key] === 'object' && objBefore[key] !== null && typeof objAfter[key] === 'object' && objAfter[key] !== null) {
        const value = genDiff(objBefore[key], objAfter[key], currentPath);
        return generateObjectPlain(key, value, 'nested', currentPath);
      }
      if (objBefore[key] === objAfter[key]) {
        return generateObjectPlain(key, objBefore[key], 'unmodified', currentPath);
      }
      return generateObjectChanged(key, objBefore[key], objAfter[key], 'changed', currentPath);
    });
};

export default genDiff;
