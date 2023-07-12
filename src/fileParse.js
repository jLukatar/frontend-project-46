import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const fileParse = (filePath) => {
  switch (path.extname(filePath)) {
    case '.yaml':
      return yaml.load(fs.readFileSync(filePath, 'utf8'));
    case '.yml':
      return yaml.load(fs.readFileSync(filePath, 'utf8'));
    case '.json':
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    default:
      throw new Error(`Unsupported file extension: ${path.extname(filePath)}`);
  }
};

export default fileParse;
