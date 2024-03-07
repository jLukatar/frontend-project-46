const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};
const getName = (name, key) => (name !== '' ? `${name}.${key}` : key);

const iter = (diff, propertyName) => diff
  .map((node) => {
    switch (node.type) {
      case 'added': {
        return `Property '${getName(propertyName, node.key)}' was added with value: ${stringify(node.value)}`;
      }
      case 'removed': {
        return `Property '${getName(propertyName, node.key)}' was removed`;
      }
      case 'changed': {
        return `Property '${getName(propertyName, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      }
      case 'unchanged': {
        return null;
      }
      case 'nested': {
        return iter(node.children, getName(propertyName, node.key));
      }
      default: {
        throw new Error(`Wrong node type: ${node.type}.`);
      }
    }
  })
  .filter(Boolean)
  .join('\n');

const makePlain = (difference) => iter(difference, '');

export default makePlain;
