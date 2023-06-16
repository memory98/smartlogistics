import {
  Box,
  Button,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';
import { border } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProductUpdate({ itemUpdateHandler, productDetail, item, setItem }) {
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(productDetail.code);

    setItem({
      code: productDetail.code,
      name: productDetail.name,
      size: productDetail.size,
      unit: productDetail.unit,
    });
    return () => {};
  }, [productDetail]);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setItem({ ...item, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // if(Object.values(item).some(value => value === '')) {
    //   alert("빈 값이 존재합니다!");
    //   Swal.fire('', '빈 값이 존재합니다. ', 'warning');
    //   setItem({
    //     code: productDetail.code,
    //     name: productDetail.name,
    //     size: productDetail.size,
    //     unit: productDetail.unit,
    //   });
    // }
    if(item.name === "" || item.name.length > 20) {
      Swal.fire('', '품명 필수 값이며 최대 20자입니다.', 'warning');
      setItem({
        ...item,
        name: productDetail.name,
      });
    }
    else if(item.size === "" || item.unit === "") {
      Swal.fire('', '규격 또는 단위가 빈 값입니다', 'warning');
      setItem({
        ...item,
        size: productDetail.size,
        unit: productDetail.unit,
      });
    }
    else {  // 빈 값이 없으면 === 모두 채워져있으면: (Object.values(item).every(value => value !== ''))
      itemUpdateHandler(item, target);
    }
    
  };
  return (
    <Grid
      item
      xs={4}
      sx={{
        padding: 3,
        backgroundColor: '#FFF',
        borderRadius: '8px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <span
        style={{
          fontSize: '18px',
          fontWeight: 800,
        }}
      >
        상세보기
      </span>

      <TableContainer sx={{ marginTop: 3 }}>
        <Table size="small" sx={{ width: '100%' }}>
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ backgroundColor: '#F6F7F9', minWidth: '94px', width: '30%', textAlign: 'center', fontWeight: '800', padding: '6px 8px' }}
              >
                품번
              </TableCell>

              <TableCell align="left" sx={{ padding: '6px 0px 6px 4px', }}>
                <TextField
                  type="text"
                  name="code"
                  size="small"
                  value={item.code || ''}
                  disabled
                  InputProps={{ sx: { height: 30, width: '100%' } }}
                  sx={{ width: '100%', }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#F6F7F9', textAlign: 'center', fontWeight: '800' }}>
                품명
              </TableCell>

              <TableCell align="left" sx={{ padding: '6px 0px 6px 4px', }}>
                <TextField
                  type="text"
                  name="name"
                  value={item.name || ''}
                  onChange={changeHandler}
                  size="small"
                  InputProps={{ sx: { height: 30, width: '100%' } }}
                  sx={{ width: '100%' }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#F6F7F9', textAlign: 'center', fontWeight: '800' }}>
                규격
              </TableCell>

              <TableCell align="left" sx={{ padding: '6px 0px 6px 4px', }}>
                <TextField
                  type="text"
                  name="size"
                  value={item.size || ''}
                  onChange={changeHandler}
                  size="small"
                  InputProps={{ sx: { height: 30, width: '100%' } }}
                  sx={{ width: '100%' }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#F6F7F9', textAlign: 'center', fontWeight: '800' }}>
                단위
              </TableCell>

              <TableCell align="left" sx={{ padding: '6px 0px 6px 4px', }}>
                <TextField
                  type="text"
                  name="unit"
                  value={item.unit || ''}
                  onChange={changeHandler}
                  size="small"
                  InputProps={{ sx: { height: 30, width: '100%' } }}
                  sx={{ width: '100%' }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button type="submit" variant="outlined" sx={{ marginTop: 2, width: '100%' }} onClick={onSubmitHandler}>
        수정
      </Button>
      {/* </FormControl> */}
    </Grid>
  );
}
