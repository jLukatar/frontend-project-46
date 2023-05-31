#!/usr/bin/env node
import * as fs from 'fs';
import { program } from 'commander';
// eslint-disable-next-line import/extensions
import generateDifference from './generateDifference.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action(async (filepath1, filepath2) => {
    const file1 = JSON.parse(await fs.promises.readFile(filepath1, 'utf-8'));
    const file2 = JSON.parse(await fs.promises.readFile(filepath2, 'utf-8'));
    // eslint-disable-next-line no-console
    console.log(generateDifference(file1, file2));
  });
program.parse();
