import React, { useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, FormControl, TableContainer, Paper, CircularProgress } from '@mui/material';
import StockItem from './StockItem';
import { Box } from '@mui/system';

const StockTable = ({ list, searchKw, searchKeyword, loading }) => {
  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      searchKeyword('load');
    }
  }

  useEffect(() => {
    const tablePro = document.getElementById('table');
    tablePro.addEventListener('scroll', handleWindowScroll);
    return () => {
      tablePro.removeEventListener('scroll', handleWindowScroll);
    }
  }, []);

  const TableHeadStyle = {
    backgroundColor: "#F6F7F9",
    fontWeight: 800
  }
  return (
    <FormControl component="form" id="table">
      <TableContainer
        component={Paper}
        sx={{
          width: '95%',
          paddingLeft: 5  ,
          paddingTop: 0,
          boxShadow: "none",
          height: 550,
        }}
        onScroll={handleWindowScroll}
      >
        <Table stickyHeader size="small" >
          <TableHead>
            <TableRow sx={{ height: 3 }} key='head'>
              <TableCell sx={TableHeadStyle}>
                입출고일
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                코드
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                담당자
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                거래처
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                품번
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                품명
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                규격
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                단위
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                기초재고
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                입고
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                출고
              </TableCell>
              <TableCell sx={TableHeadStyle}>
                기말재고
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {loading.current ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : list.length > 0 ? (

                list.map((item, index) =>
                  <StockItem
                    key={index}
                    index={index}
                    state={item.state}
                    date={item.date}
                    code={item.code}
                    userName={item.userName}
                    businessName={item.businessName}
                    productCode={item.productCode}
                    productName={item.productName}
                    size={item.size}
                    unit={item.unit}
                    beginningStock={item.beginningStock}
                    count={item.count}
                    endingStock={item.endingStock}
                  />
                  )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12} sx={{ textAlign: 'center' }}>
                        해당하는 현황 리스트가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
          </TableBody>
        </Table>
      </TableContainer>
    </FormControl>
  );
};

export default StockTable;