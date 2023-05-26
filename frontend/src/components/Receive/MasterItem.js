import { Box, Checkbox, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const MasterItem = ({
  no,
  code,
  date,
  username,
  businessname,
  disable,
  exit,
  receiveDetail,
  rowColor,
  state,
  checkedRow,
  masterStateUpdate,
}) => {
  // console.log(code, " ", exit);
  /** 이벤트 캡처링 - 이벤트 전파 막기 */
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
  };
  const bgcolor = useRef();
  if (state === '대기') {
    bgcolor.current = '#FFE7B3';
  } else if (state === '완료') {
    bgcolor.current = '#B4E9B8';
  } else if (state === '진행') {
    bgcolor.current = '#B3BFF7';
  }
  useEffect(() => {
    console.log('exit****', exit === '1');
  }, []);
  return (
    <TableRow
      key={no}
      sx={{
        ':hover':
          rowColor.current === code
            ? ''
            : {
                background: '#EFF8FF',
                fontWeight: 600,
              },
        '&.Mui-selected': {
          backgroundColor: '#000',
        },
        backgroundColor: rowColor.current === code ? '#DCF1FF' : '#FFF',
      }}
      id="searchRow"
      onClick={() => {
        receiveDetail(code || '');
      }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox
          size="small"
          checked={checkedRow.some(
            (row) =>
              row.master === code && (row.state === 't' || (row.detail.length > 0 && row.detail.every((d) => d.state === 't')))
          )}
          disabled={checkedRow.some(
            (row) =>
              row.master === code && row.state === 't' && row.detail.length !== 0 && row.detail.every((d) => d.state === 't')
          )}
          onChange={(e) => {
            masterStateUpdate(e.currentTarget.checked, code);
          }}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell id="code">{code}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{exit === '0' ? username + '(퇴사자)' : username}</TableCell>
      <TableCell>{businessname}</TableCell>
      <TableCell>
        <Box
          sx={{
            width: '70px',
            height: '22px',
            backgroundColor: state === '대기' ? '#FFE7B3' : state === '완료' ? '#B4E9B8' : '#B3BFF7',
            borderRadius: '25px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontWeight: 450, margin: '3px' }}>{state}</span>
        </Box>
      </TableCell>
      <TableCell>
        <span style={{ fontWeight: 450, margin: '3px', color: 'red' }}>{disable === 'true' ? '수량 미입력' : ''}</span>
      </TableCell>
    </TableRow>
  );
};

export default MasterItem;
