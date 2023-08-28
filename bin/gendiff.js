#!/usr/bin/env node
import path from 'path';
import { program } from 'commander';
// eslint-disable-next-line import/extensions
import generateDiff from '../src/generateDiff.js';
// eslint-disable-next-line import/extensions
import fileParse from '../src/fileParse.js';
// eslint-disable-next-line import/extensions
import makeStylish from '../src/makeStylish.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath> <filepath2>')
  .action(async (filepath1, filepath2) => {
    const file1 = fileParse(path.resolve(filepath1));
    const file2 = fileParse(path.resolve(filepath2));

    const options = program.opts();

    if (options.format === 'stylish') {
      // eslint-disable-next-line no-console
      console.log(makeStylish(generateDiff(file1, file2)));
    } else if (options.format === 'robust') {
      // eslint-disable-next-line no-console
      console.log('kwk');
    } else {
      // eslint-disable-next-line no-console
      console.error(`Invalid format option: ${options.format}`);
    }
  });

program.parse();
