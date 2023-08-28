const diff = [
  {
    key: 'common',
    value: [
      {
        key: 'setting1',
        value: 'Value 1',
        status: 'unmodified',
      },
      {
        key: 'setting2',
        value: 200,
        status: 'deleted',
      },
      {
        key: 'setting3',
        valueBefore: true,
        valueAfter: null,
        status: 'changed',
      },
      {
        key: 'setting6',
        value: [
          {
            key: 'key',
            value: 'value',
            status: 'unmodified',
          },
          {
            key: 'doge',
            value: [
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
            key: 'ops',
            value: 'vops',
            status: 'added',
          },
        ],
        status: 'nested',
      },
      {
        key: 'follow',
        value: false,
        status: 'added',
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
    ],
    status: 'nested',
  },
  {
    key: 'group1',
    value: [
      {
        key: 'baz',
        valueBefore: 'bas',
        valueAfter: 'bars',
        status: 'changed',
      },
      {
        key: 'foo',
        value: 'bar',
        status: 'unmodified',
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
    status: 'deleted',
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
