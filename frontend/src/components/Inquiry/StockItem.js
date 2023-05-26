import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const StockItem = ({
  index,
  code,
  date,
  state,
  userName,
  businessName,
  productCode,
  productName,
  size,
  unit,
  count,
  beginningStock,
  endingStock
}) => {
  return (
    <TableRow key={index} sx={{
      bgcolor: state === 'RV' ? 'rgba(255, 99, 132, 0.1)' : 'rgba(54, 162, 235, 0.1)',
      border: '1px solid #000',
      borderRadius: '10px'
    }}>
      <TableCell>{date}</TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>{userName.length > 5 ? userName.substr(0, 5) + '...' : userName}</TableCell>
      <TableCell>
        {businessName.length > 5 ? businessName.substr(0, 5) + '...' : businessName}
      </TableCell>
      <TableCell>{productCode}</TableCell>
      <TableCell>
        {productName.length > 5 ? productName.substr(0, 5) + '...' : productName}
      </TableCell>
      <TableCell>{size}</TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell>{beginningStock}</TableCell>
      {
        state === 'RV' ?
          <>
            <TableCell>{count}</TableCell>
            <TableCell> </TableCell>
          </> :
          <>
            <TableCell> </TableCell>
            <TableCell>{count}</TableCell>
          </>
      }
      <TableCell>{endingStock}</TableCell>
    </TableRow>
  );
};

export default StockItem;