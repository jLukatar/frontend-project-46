const diff = [
  {
    key: 'common',
    children: [
      {
        key: 'follow',
        value: false,
        status: 'added',
      },
      {
        key: 'setting1',
        value: 'Value 1',
        status: 'unchanged',
      },
      {
        key: 'setting2',
        value: 200,
        status: 'removed',
      },
      {
        key: 'setting3',
        valueBefore: true,
        valueAfter: null,
        status: 'changed',
      },
      {
        key: 'setting4',
        value: 'blah blah',
        status: 'added',
      },
      {
        key: 'setting5',
        value: {
          key5: 'value5',
        },
        status: 'added',
      },
      {
        key: 'setting6',
        children: [
          {
            key: 'doge',
            children: [
              {
                key: 'wow',
                valueBefore: '',
                valueAfter: 'so much',
                status: 'changed',
              },
            ],
            status: 'nested',
          },
          {
            key: 'key',
            value: 'value',
            status: 'unchanged',
          },
          {
            key: 'ops',
            value: 'vops',
            status: 'added',
          },
        ],
        status: 'nested',
      },
    ],
    status: 'nested',
  },
  {
    key: 'group1',
    children: [
      {
        key: 'baz',
        valueBefore: 'bas',
        valueAfter: 'bars',
        status: 'changed',
      },
      {
        key: 'foo',
        value: 'bar',
        status: 'unchanged',
      },
      {
        key: 'nest',
        valueBefore: {
          key: 'value',
        },
        valueAfter: 'str',
        status: 'changed',
      },
    ],
    status: 'nested',
  },
  {
    key: 'group2',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    status: 'removed',
  },
  {
    key: 'group3',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
    status: 'added',
  },
];
export default diff;
