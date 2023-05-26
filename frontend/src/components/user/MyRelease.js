import React, { useEffect, useState } from 'react';
import { customFetch } from '../custom/customFetch';
import checkImg from '../../assets/img/checkmark.png';
import jwt_decode from 'jwt-decode';
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const MyRelease = ({ info }) => {
  // ReceiveMaster
  const [receiveMaster, setreceiveMaster] = useState([]);
  useEffect(() => {
    receiveMasterSearch();
  }, []);

  // ReceiveMaster검색
  const receiveMasterSearch = async () => {
    var url = `/api/release/mylist?u=${localStorage.getItem('name')}`;

    await customFetch(url, { method: 'get' }).then((json) => {
      if (json.data != '' || !json.data) {
        setreceiveMaster(json.data);
      }
    });
  };
  return (
    <Grid item spacing={2} style={{ width: '50%', marginRight: '80px' }}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="img"
          src={checkImg}
          sx={{
            width: 20,
            height: 20,
            marginTop: '5px',
          }}
        />
        <span
          style={{
            position: 'relative',
            fontSize: '16px',
            fontWeight: 800,
            marginRight: '15px',
            marginTop: '5px',
            marginLeft: '10px',
          }}
        >
          출고리스트
        </span>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: '95%',
            paddingTop: 0,
            boxShadow: 'none',
            height: 200,
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{ height: 3 }}>
                <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>출고번호</TableCell>
                <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>출고일</TableCell>
                <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>거래처</TableCell>
                <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>진행상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receiveMaster && receiveMaster.length > 0 ? (
                receiveMaster.map((master, index) => {
                  return (
                    <TableRow key={index} id="searchRow">
                      <TableCell id="code">{master.code}</TableCell>
                      <TableCell>{master.date}</TableCell>
                      <TableCell>{master.businessName}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            width: '70px',
                            height: '22px',
                            backgroundColor: '#B4E9B8',
                            borderRadius: '25px',
                            textAlign: 'center',
                          }}
                        >
                          <span style={{ fontWeight: 450, margin: '3px' }}>완료</span>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                    등록된 출고리스트가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default MyRelease;
