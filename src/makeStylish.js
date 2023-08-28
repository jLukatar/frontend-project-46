const space = ' ';
const stringifyValue = (obj, indent) => {
  const keys = Object.keys(obj);
  const indentString = space.repeat(indent);

  const result = keys.map((key) => {
    let valueString;
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      valueString = stringifyValue(value, indent + 4);
    } else {
      valueString = value;
    }
    return `${indentString}  ${key}: ${valueString}`;
  });
  return `{\n${result.join('\n')}\n${space.repeat(indent - 2)}}`;
};

const processObjectValue = (value, indent) => {
  if (typeof value === 'object' && value !== null) {
    return stringifyValue(value, indent);
  }
  return value;
};
const makeStylish = (difference) => {
  let output = '';

  const iter = (diff, spaceCount = 2) => {
    const indentation = space.repeat(spaceCount);
    if (Array.isArray(diff)) {
      diff.sort((a, b) => a.key.localeCompare(b.key));
      output = diff
        .map((element) => iter(element, spaceCount))
        .join('');
    }
    if (['added', 'deleted'].includes(diff.status)) {
      const sign = (diff.status === 'added') ? '+' : '-';
      const valueString = processObjectValue(diff.value, spaceCount + 4);
      output = `\n${indentation}${sign} ${diff.key}: ${valueString}`;
    }
    if (diff.status === 'unmodified') {
      output = `\n${indentation}  ${diff.key}: ${diff.value}`;
    }
    if (diff.status === 'changed') {
      const valueBefore = processObjectValue(diff.valueBefore, spaceCount + 4);
      const valueAfter = processObjectValue(diff.valueAfter, spaceCount + 4);
      output = `\n${indentation}- ${diff.key}: ${valueBefore}\n${indentation}+ ${diff.key}: ${valueAfter}`;
    }
    if (diff.status === 'nested') {
      output = `\n${indentation}  ${diff.key}: {${iter(diff.value, spaceCount + 4)}\n${indentation}  }`;
    }
    return output;
  };
  return `{${iter(difference)}\n}`;
};

export default makeStylish;
