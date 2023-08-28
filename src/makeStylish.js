const makeStylish = (difference) => {
  const space = ' ';
  let output = '';

  const processUnchangedValues = (obj, indent) => {
    const keys = Object.keys(obj);
    const indentString = space.repeat(indent);
    let result = '';

    keys.forEach((key, index) => {
      const value = obj[key];
      let valueString;

      if (typeof value === 'object' && value !== null) {
        valueString = processUnchangedValues(value, indent + 4);
      } else {
        valueString = value;
      }

      if (index === 0) {
        result += `{\n${indentString}  ${key}: ${valueString}\n`;
      } else {
        result += `${indentString}  ${key}: ${valueString}\n`;
      }

      if (index === keys.length - 1) {
        result += `${space.repeat(indent - 2)}}`;
      }
    });

    return result;
  };

  const iter = (diff, spaceCount = 2) => {
    if (Array.isArray(diff)) {
      diff.sort((a, b) => a.key.localeCompare(b.key));
      output = diff.map((element) => iter(element, spaceCount));
      return output.join('');
    }
    if (diff.status === 'added') {
      if (typeof diff.value === 'object' && diff.value !== null) {
        return `\n${space.repeat(spaceCount)}+ ${diff.key}: ${processUnchangedValues(diff.value, spaceCount + 4)}`;
      }
      return `\n${space.repeat(spaceCount)}+ ${diff.key}: ${diff.value}`;
    }
    if (diff.status === 'deleted') {
      if (typeof diff.value === 'object' && diff.value !== null) {
        return `\n${space.repeat(spaceCount)}- ${diff.key}: ${processUnchangedValues(diff.value, spaceCount + 4)}`;
      }
      return `\n${space.repeat(spaceCount)}- ${diff.key}: ${diff.value}`;
    }
    if (diff.status === 'unmodified') {
      return `\n${space.repeat(spaceCount)}  ${diff.key}: ${diff.value}`;
    }
    if (diff.status === 'changed') {
      let valueBefore = '';
      let valueAfter = '';

      if (typeof diff.valueBefore === 'object' && diff.valueBefore !== null) {
        valueBefore = processUnchangedValues(diff.valueBefore, spaceCount + 4);
      } else {
        valueBefore = diff.valueBefore;
      }

      if (typeof diff.valueAfter === 'object' && diff.valueAfter !== null) {
        valueAfter = processUnchangedValues(diff.valueAfter, spaceCount + 4);
      } else {
        valueAfter = diff.valueAfter;
      }

      return `\n${space.repeat(spaceCount)}- ${diff.key}: ${valueBefore}\n${space.repeat(spaceCount)}+ ${diff.key}: ${valueAfter}`;
    }
    if (diff.status === 'nested') {
      return `\n${space.repeat(spaceCount)}  ${diff.key}: {${iter(diff.value, spaceCount + 4)}\n${space.repeat(spaceCount)}  }`;
    }
    throw Error('unexpected case in input function');
  };
  return `{${iter(difference)}\n}`;
};

export default makeStylish;
