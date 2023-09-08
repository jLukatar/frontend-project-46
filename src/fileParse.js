import yaml from 'js-yaml';

const fileParse = (data, extension) => {
  switch (extension) {
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }
};

export default fileParse;
