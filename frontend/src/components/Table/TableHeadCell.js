import React from 'react';

const TableHeadCell = ({ style, children }) => {
  const updatedStyle = Object.assign({}, style, { 
    padding:'10px',
    // border: '1px solid #000',
  });
  return (
    <th 
      style={updatedStyle}
      colspan="10">
      {children}
    </th>
  );
};

export default TableHeadCell;