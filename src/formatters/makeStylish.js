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

    if (diff.status === 'added') {
      const valueString = processValue(diff.value, spaceCount + 4);
      return `${indentation}+ ${diff.key}: ${valueString}`;
    }
    if (diff.status === 'removed') {
      const valueString = processValue(diff.value, spaceCount + 4);
      return `${indentation}- ${diff.key}: ${valueString}`;
    }
    if (diff.status === 'unchanged') {
      return `${indentation}  ${diff.key}: ${diff.value}`;
    }
    if (diff.status === 'changed') {
      const firstObjValue = processValue(diff.firstObjValue, spaceCount + 4);
      const secondObjValue = processValue(diff.secondObjValue, spaceCount + 4);
      return `${indentation}- ${diff.key}: ${firstObjValue}\n${indentation}+ ${diff.key}: ${secondObjValue}`;
    }
    if (diff.status === 'nested') {
      const children = diff.children.map((element) => iter(element, spaceCount + 4)).join('\n');
      return `${indentation}  ${diff.key}: {\n${children}\n${indentation}  }`;
    }

    throw new Error(`Unhandled diff status: ${diff.status}`);
  };

  return `{\n${difference.map((element) => iter(element)).join('\n')}\n}`;
};
export default makeStylish;
