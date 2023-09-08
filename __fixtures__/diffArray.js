const diff = [
  {
    key: 'common',
    value: [
      {
        key: 'setting1',
        value: 'Value 1',
        status: 'unmodified',
        path: 'common.setting1',
      },
      {
        key: 'setting2',
        value: 200,
        status: 'deleted',
        path: 'common.setting2',
      },
      {
        key: 'setting3',
        valueBefore: true,
        valueAfter: null,
        status: 'changed',
        path: 'common.setting3',
      },
      {
        key: 'setting6',
        value: [
          {
            key: 'key',
            value: 'value',
            status: 'unmodified',
            path: 'common.setting6.key',
          },
          {
            key: 'doge',
            value: [
              {
                key: 'wow',
                valueBefore: '',
                valueAfter: 'so much',
                status: 'changed',
                path: 'common.setting6.doge.wow',
              },
            ],
            status: 'nested',
            path: 'common.setting6.doge',
          },
          {
            key: 'ops',
            value: 'vops',
            status: 'added',
            path: 'common.setting6.ops',
          },
        ],
        status: 'nested',
        path: 'common.setting6',
      },
      {
        key: 'follow',
        value: false,
        status: 'added',
        path: 'common.follow',
      },
      {
        key: 'setting4',
        value: 'blah blah',
        status: 'added',
        path: 'common.setting4',
      },
      {
        key: 'setting5',
        value: {
          key5: 'value5',
        },
        status: 'added',
        path: 'common.setting5',
      },
    ],
    status: 'nested',
    path: 'common',
  },
  {
    key: 'group1',
    value: [
      {
        key: 'baz',
        valueBefore: 'bas',
        valueAfter: 'bars',
        status: 'changed',
        path: 'group1.baz',
      },
      {
        key: 'foo',
        value: 'bar',
        status: 'unmodified',
        path: 'group1.foo',
      },
      {
        key: 'nest',
        valueBefore: {
          key: 'value',
        },
        valueAfter: 'str',
        status: 'changed',
        path: 'group1.nest',
      },
    ],
    status: 'nested',
    path: 'group1',
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
    path: 'group2',
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
    path: 'group3',
  },
];
export default diff;
