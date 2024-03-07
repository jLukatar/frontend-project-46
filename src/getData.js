import yaml from 'js-yaml';

const formate = (data, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unsupported file parse: ${parse}`);
  }
};

export default formate;
