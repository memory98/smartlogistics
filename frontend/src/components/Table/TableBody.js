import React from 'react';

const TableBody = ({ style, children }) => {
  const updatedStyle = Object.assign({}, style, { 
    padding: '5px',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    overflowY: 'hidden'
  });
  return (
    <tbody style={updatedStyle}>
      {children}
    </tbody>
  );
};

export default TableBody;