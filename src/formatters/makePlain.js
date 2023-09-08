const processValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};
const makePlain = (difference) => {
  const iter = (diff) => {
    if (Array.isArray(diff)) {
      diff.sort((a, b) => a.key.localeCompare(b.key));
      return diff
        .map((element) => iter(element)).join('');
    }
    if (diff.status === 'added') {
      return `Property '${diff.path}' was added with value: ${processValue(diff.value)}\n`;
    }
    if (diff.status === 'deleted') {
      return `Property '${diff.path}' was removed\n`;
    }
    if (diff.status === 'changed') {
      return `Property '${diff.path}' was updated. From ${processValue(diff.valueBefore)} to ${processValue(diff.valueAfter)}\n`;
    }
    if (diff.status === 'nested') {
      return iter(diff.value);
    }
    return '';
  };
  return iter(difference).slice(0, -1);
};

export default makePlain;
