// eslint-disable-next-line import/extensions
import genDiff from '../src/generateDiff.js';

describe('genDiff', () => {
  it('should return an empty array for two empty objects', () => {
    const objBefore = {};
    const objAfter = {};
    const result = genDiff(objBefore, objAfter);
    expect(result).toEqual([]);
  });

  it('should correctly identify added properties', () => {
    const objBefore = { a: 1 };
    const objAfter = { a: 1, b: 2 };
    const result = genDiff(objBefore, objAfter);
    expect(result).toEqual([
      {
        key: 'a', value: 1, status: 'unmodified', path: 'a',
      },
      {
        key: 'b', value: 2, status: 'added', path: 'b',
      },
    ]);
  });

  it('should correctly identify deleted properties', () => {
    const objBefore = { a: 1, b: 2 };
    const objAfter = { a: 1 };
    const result = genDiff(objBefore, objAfter);
    expect(result).toEqual([
      {
        key: 'a', value: 1, status: 'unmodified', path: 'a',
      },
      {
        key: 'b', value: 2, status: 'deleted', path: 'b',
      },
    ]);
  });

  it('should correctly identify nested objects', () => {
    const objBefore = { a: { x: 1 }, b: 2 };
    const objAfter = { a: { x: 1, y: 2 }, b: 2 };
    const result = genDiff(objBefore, objAfter);
    expect(result).toEqual([
      {
        key: 'a',
        value: [
          {
            key: 'x', value: 1, status: 'unmodified', path: 'a.x',
          },
          {
            key: 'y', value: 2, status: 'added', path: 'a.y',
          },
        ],
        status: 'nested',
        path: 'a',
      },
      {
        key: 'b', value: 2, status: 'unmodified', path: 'b',
      },
    ]);
  });

  it('should correctly identify modified properties', () => {
    const objBefore = { a: 1, b: 'hello' };
    const objAfter = { a: 1, b: 'world' };
    const result = genDiff(objBefore, objAfter);
    expect(result).toEqual([
      {
        key: 'a', value: 1, status: 'unmodified', path: 'a',
      },
      {
        key: 'b', valueBefore: 'hello', valueAfter: 'world', status: 'changed', path: 'b',
      },
    ]);
  });
});
