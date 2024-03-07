const space = ' ';

const processValue = (value, indent) => {
  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    const indentString = space.repeat(indent);
    const result = keys.map((key) => {
      const nestedValue = processValue(value[key], indent + 4);
      return `${indentString}  ${key}: ${nestedValue}`;
    });
    return `{\n${result.join('\n')}\n${space.repeat(indent - 2)}}`;
  }
  return value;
};

const makeStylish = (difference) => {
  const iter = (diff, spaceCount = 2) => {
    const indentation = ' '.repeat(spaceCount);

    if (diff.type === 'added') {
      const valueString = processValue(diff.value, spaceCount + 4);
      return `${indentation}+ ${diff.key}: ${valueString}`;
    }
    if (diff.type === 'removed') {
      const valueString = processValue(diff.value, spaceCount + 4);
      return `${indentation}- ${diff.key}: ${valueString}`;
    }
    if (diff.type === 'unchanged') {
      return `${indentation}  ${diff.key}: ${diff.value}`;
    }
    if (diff.type === 'changed') {
      const value1 = processValue(diff.value1, spaceCount + 4);
      const value2 = processValue(diff.value2, spaceCount + 4);
      return `${indentation}- ${diff.key}: ${value1}\n${indentation}+ ${diff.key}: ${value2}`;
    }
    if (diff.type === 'nested') {
      const children = diff.children.map((element) => iter(element, spaceCount + 4)).join('\n');
      return `${indentation}  ${diff.key}: {\n${children}\n${indentation}  }`;
    }

    throw new Error(`Unhandled diff type: ${diff.type}`);
  };

  return `{\n${difference.map((element) => iter(element)).join('\n')}\n}`;
};
export default makeStylish;
