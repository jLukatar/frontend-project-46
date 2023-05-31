import generateDifference from './generateDifference.js'

const file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const file2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};
const data1 = { key: 'value1' };
const data2 = { key: 'value2' };
console.log(generateDifference(data1, data2))