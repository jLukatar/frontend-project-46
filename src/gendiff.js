#!/usr/bin/env node

const { program } = require('commander');

program
  .version('1.0.0')
  .description("Compares two configuration files and shows a difference.")
  .option('-f, --format <type>', 'output format (default: "stylish")','stylish')
  .arguments('<filepath1> <filepath2>');
program.parse();

const options = program.opts();
const format = options.format;
const filePath1 = program.args[0];
const filePath2 = program.args[1];
console.log(format,filePath1,filePath2);
