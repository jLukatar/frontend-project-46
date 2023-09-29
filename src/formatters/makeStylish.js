const space = ' ';

const stringifyValue = (obj, indent) => {
  const keys = Object.keys(obj);
  const indentString = space.repeat(indent);

  const result = keys.map((key) => {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      const valueString = stringifyValue(value, indent + 4);
      return `${indentString}  ${key}: ${valueString}`;
    }
    const valueString = value;
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
  const iter = (diff, spaceCount = 2) => {
    const indentation = ' '.repeat(spaceCount);

    if (Array.isArray(diff)) {
      return diff.map((element) => iter(element, spaceCount)).join('');
    }
    if (diff.status === 'added') {
      const valueString = processObjectValue(diff.value, spaceCount + 4);
      return `\n${indentation}+ ${diff.key}: ${valueString}`;
    }
    if (diff.status === 'removed') {
      const valueString = processObjectValue(diff.value, spaceCount + 4);
      return `\n${indentation}- ${diff.key}: ${valueString}`;
    }
    if (diff.status === 'unchanged') {
      return `\n${indentation}  ${diff.key}: ${diff.value}`;
    }
    if (diff.status === 'changed') {
      const valueBefore = processObjectValue(diff.valueBefore, spaceCount + 4);
      const valueAfter = processObjectValue(diff.valueAfter, spaceCount + 4);
      return `\n${indentation}- ${diff.key}: ${valueBefore}\n${indentation}+ ${diff.key}: ${valueAfter}`;
    }
    if (diff.status === 'nested') {
      return `\n${indentation}  ${diff.key}: {${iter(diff.children, spaceCount + 4)}\n${indentation}  }`;
    }

    return '';
  };

  return `{${iter(difference)}\n}`;
};
export default makeStylish;
