import React from 'react';

const TableHead = ({ style, children }) => {
  const updatedStyle = Object.assign({}, style, { 
  });
  return (
    <th style={style}>
      {children}
    </th>
  );
};

export default TableHead;