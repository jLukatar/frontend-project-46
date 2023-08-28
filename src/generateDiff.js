function genDiff(objBefore, objAfter) {
  // const diff = [];

  const beforeKeys = Object.keys(objBefore);
  const afterKeys = Object.keys(objAfter);
  const mergedKeys = [...beforeKeys, ...afterKeys]
    .filter((key, index, array) => array.indexOf(key) === index);

  return mergedKeys
    .map((key) => {
      if (!Object.hasOwn(objBefore, key)) {
        return {
          key,
          value: objAfter[key],
          status: 'added',
        };
      }
      if (!Object.hasOwn(objAfter, key)) {
        return {
          key,
          value: objBefore[key],
          status: 'deleted',
        };
      }
      if (typeof objBefore[key] === 'object' && objBefore[key] !== null && typeof objAfter[key] === 'object' && objAfter[key] !== null) {
        return {
          key,
          value: genDiff(objBefore[key], objAfter[key]),
          status: 'nested',
        };
      }
      if (objBefore[key] === objAfter[key]) {
        return {
          key,
          value: objBefore[key],
          status: 'unmodified',
        };
      }
      return {
        key,
        valueBefore: objBefore[key],
        valueAfter: objAfter[key],
        status: 'changed',
      };
    });
}

export default genDiff;
