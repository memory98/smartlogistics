import { ControlPointDuplicateRounded } from '@mui/icons-material';
import { Box, Checkbox, TableCell, TableRow, TextField } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';

const DetailItem = ({
  index,
  no,
  mcode,
  pcode,
  pname,
  psize,
  putil,
  receivecnt,
  stockcnt,
  updateReceiveCnt,
  state,
  checkedRow,
  setCheckedRow,
  setCountCheck,
  handleEnterKeyPress,
}) => {
  const [count, setCount] = useState(receivecnt);

  const countChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9a-zA-Z]/g, '');
    setCount(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // console.log(e.target);
      handleSubmit(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateReceiveCnt(count, no, mcode);
    e.target.value !== '' ? handleEnterKeyPress(index) : alert('값을 입력해야 합니다');
  };
  /** detail 행 클릭 시 실행하는 함수 */
  const updatedCheckedRow = (e) =>
    checkedRow.map((row) => {
      const { master, detail } = row;
      if (master === mcode) {
        const updatedDetail = detail.map((d) => {
          if (d.no === no) {
            return {
              ...d,
              state: e.currentTarget.checked ? 't' : 'f',
            };
          }
          return d;
        });
        const f = updatedDetail.every((el) => el.state === 't') ? 't' : 'f';
        return {
          ...row,
          state: f,
          detail: updatedDetail,
        };
      }
      return row;
    });

  return (
    <TableRow
      key={index}
      sx={{
        ':hover': {
          background: '#EFF8FF',
          fontWeight: 600,
        },
        '&.Mui-selected': {
          backgroundColor: '#000',
        },
      }}
      id="searchRow"
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox
          size="small"
          onChange={(e) => {
            setCheckedRow(updatedCheckedRow(e));
          }}
          checked={
            checkedRow.filter(
              (row) =>
                (row.master === mcode && row.state === 't') ||
                row.detail.some((detail) => detail.no === no && detail.state === 't')
            ).length > 0
              ? true
              : false
          }
          disabled={
            checkedRow.filter(
              (row) => row.master === mcode && row.state === 't' && !row.detail.every((item) => item.state === 't')
            ).length > 0
              ? true
              : false
          }
        />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell title={pname}>{pname.length > 10 ? pname.substring(0, 10) + '...' : pname}</TableCell>
      <TableCell>{psize}</TableCell>
      <TableCell>{putil}</TableCell>
      <TableCell>
        <TextField
          disabled={state && state !== '대기'}
          type="text"
          id={`receivecnt-${index}`}
          name="receivecnt"
          value={count === 0 ? '' : count}
          placeholder="입력 후 Enter"
          onKeyPress={handleKeyDown}
          onChange={countChangeHandler}
          InputProps={{ sx: { height: 30 } }}
        ></TextField>
      </TableCell>
      <TableCell>{stockcnt}</TableCell>
      <TableCell>
        {(state && (
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
        )) || (
          <Box
            sx={{
              width: '70px',
              height: '22px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontWeight: 450, margin: '3px', color: 'red' }}>수량입력</span>
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};

export default DetailItem;
