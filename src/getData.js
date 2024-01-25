import yaml from 'js-yaml';

const getData = (data, parse) => {
  switch (parse) {
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unsupported file parse: ${parse}`);
  }
};

export default getData;
