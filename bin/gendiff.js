#!/usr/bin/env node
import * as fs from 'fs';
import { program } from 'commander';
import _ from 'lodash';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>');
program.parse();

const file1 = JSON.parse(fs.readFileSync(program.args[0], 'utf-8'));
const file2 = JSON.parse(fs.readFileSync(program.args[1], 'utf-8'));

const mergeAndSort = (data1, data2) => {
  const mergedData = { ...data1, ...data2 };
  return _.orderBy(Object.keys(mergedData));
};

const genDiff = (data1, data2) => {
  const space = ' ';
  const keys = mergeAndSort(data1, data2);
  const result = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return `${space.repeat(2)}+ ${key}: ${data2[key]}`;
    }
    if (!Object.hasOwn(data2, key)) {
      return `${space.repeat(2)}- ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `${space.repeat(2)}- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `${space.repeat(4)}${key}: ${data1[key]}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

console.log(genDiff(file1, file2));
