#!/usr/bin/env node
import path from 'path';
import { program } from 'commander';
// eslint-disable-next-line import/extensions
import generateDifference from '../src/generateDifference.js';
// eslint-disable-next-line import/extensions
import fileParse from '../src/fileParse.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action(async (filepath1, filepath2) => {
    const file1 = fileParse(path.resolve(filepath1));
    const file2 = fileParse(path.resolve(filepath2));
    // eslint-disable-next-line no-console
    console.log(generateDifference(file1, file2));
  });
program.parse();
