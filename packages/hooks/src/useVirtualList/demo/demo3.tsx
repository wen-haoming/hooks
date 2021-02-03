import React from 'react';
import { Table } from 'antd';
import { useVirtualList } from 'ahooks';

const data = Array.from({ length: 100 }, (_, key) => ({ key }));

// Usage
const columns = [
  { title: 'A', dataIndex: 'key', width: 150 },
  { title: 'B', dataIndex: 'key2' },
];

export default () => {
  const { list, containerProps, wrapperProps } = useVirtualList(Array.from(Array(999).keys()), {
    overscan: 30,
    itemHeight: 60,
  });

  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={list}
      scroll={{ x: '100vw', y: 300 }}
      components={{
        body: {
          wrapper: (props) => {
            return (
              <div {...containerProps} style={{ height: 300, overflow: 'auto' }}>
                <div {...wrapperProps}>{props.children} +</div>
              </div>
            );
          },
          row: (props) => {
            console.log(props);

            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #e8e8e8',
                  marginBottom: 8,
                }}
                {...props}
              >
                {props['data-row-key']}{' '}
              </div>
            );
          },
        },
      }}
    />
  );
};
