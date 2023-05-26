import React from 'react';

const TableCell = ({ style, children }) => {
  const updatedStyle = Object.assign({}, style, { 
    position: 'static',
    marginLeft: 'auto',
    marginRigth: 'auto',
    lineHeight: '50px'
    // border: '1px solid #000',
  });
  return (
    <td 
      style={updatedStyle}>
      {children}
    </td>
  );
};

export default TableCell;