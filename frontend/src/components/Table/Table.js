import React from 'react';

const Table = ({ style, children }) => {
  const updatedStyle = Object.assign({}, style, { 
    padding: '5px',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    overflowY: 'hidden'
  });
  return (
    <table style={updatedStyle}>
      {children}
    </table>
  );
};

export default Table;