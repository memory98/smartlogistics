import {
  Box,
  Checkbox,
  CircularProgress,
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
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import MasterItem from './MasterItem';
import checkImg from '../../assets/img/checkmark.png';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 38.5px;
  }
`;

const ReceiveMaster = ({
  masters,
  releaseDetail,
  checkedRow,
  setCheckedRow,
  rowColor,
  toggleModal,
  openNullModal,
  openDeleteModalInMaster,
  openManager,
  openBusiness,
  nullChkHandler,
  inputMaster,
  setInputMaster,
  masterStateT,
  loading,
  releaseMasterSearch
}) => {
  useEffect(() => {
    nullChkHandler(inputMaster);
    return () => {};
  }, [inputMaster]);

  const onChangeHandler = (e) => {
    console.log(e.target);
    const { value, name } = e.target;
    setInputMaster((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccept = (date) => {
    setInputMaster({ ...inputMaster, date: format(date.$d, 'yyyy-MM-dd') });
  };

  /** 모두 선택해주는 체크박스 (All Master) */
  const masterAllCheckBox = (checked) => {
    const updatedCheckedRow = checkedRow.map((row) => {
      return {
        ...row,
        state: checked ? 't' : 'f',
      };
    });
    setCheckedRow(updatedCheckedRow);
  };

  /** 체크박스 클릭 시 master state의 값을 true, false로 변경해주는 함수 */
  const masterStateUpdate = (checked, code) => {
    setCheckedRow(
      checkedRow.map((row) => {
        if (row.master === code) {
          const newState = checked ? 't' : 'f';
          const newDetail = checked ? row.detail : row.detail.map((d) => ({ ...d, state: 'f' }));
          return {
            ...row,
            state: newState,
            detail: newDetail,
          };
        } else {
          return row;
        }
      })
    );
  };

  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      releaseMasterSearch('load');
    }
  };

  useEffect(() => {
    const tablePro = document.getElementById('table');
    tablePro.addEventListener('scroll', handleWindowScroll);
    return () => {
      tablePro.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);
  return (
    <Grid
      item
      xs={12}
      sx={{
        width: '100%',
        height: 360,
        backgroundColor: '#FFF',
        borderRadius: '8px',
        marginBottom: 1.8,
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', paddingLeft: 3, width: '94%' }}>
        <Box
          component="img"
          src={checkImg}
          sx={{
            width: '30px',
            height: '30px',
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
        <DeleteIcon
          sx={{
            padding: '7px',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
          onClick={() => {
            masterStateT.length !== 0 ? toggleModal(openDeleteModalInMaster, 'deleteMaster') : toggleModal(openNullModal, 'null');
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <FormControl component="form" id="table">
          <TableContainer
            component={Paper}
            sx={{
              width: '94%',
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: 'none',
              height: 300,
            }}
            onScroll={handleWindowScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ height: 3 }}>
                  <TableCell
                    sx={{
                      width: '5%',
                      backgroundColor: '#F6F7F9',
                      p: 0,
                      textAlign: 'center',
                    }}
                  >
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        masterAllCheckBox(e.currentTarget.checked);
                      }}
                      checked={checkedRow.length !== 0 && checkedRow.every((row) => row.state === 't')}
                    />
                  </TableCell>
                  <TableCell sx={{ width: '18%', backgroundColor: '#F6F7F9', fontWeight: '800' }}>출고번호</TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>출고일</TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>담당자</TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>거래처</TableCell>
                  <TableCell sx={{ width: '10%', backgroundColor: '#F6F7F9', fontWeight: '800' }}>진행상태</TableCell>
                  <TableCell sx={{ width: '10%', backgroundColor: '#F6F7F9', p: 0, fontWeight: '800' }}>비고</TableCell>
                </TableRow>
                <TableRow sx={{ height: 2, p: 0 }}>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell sx={{ p: 0 }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      sx={{
                        height: '60px',
                      }}
                    >
                      <DemoContainer
                        components={['DatePicker']}
                        sx={{
                          p: 0,
                          '& .css-1xhypcz-MuiStack-root': {
                            padding: 0,
                          },
                        }}
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                          slotProps={{
                            textField: { size: 'small' },
                          }}
                          sx={{
                            paddingLeft: 2,
                            paddingRight: 5,
                            height: '35px',
                            '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                              padding: 0,
                              height: '1em',
                              width: 150,
                              marginLeft: '10px',
                            },
                          }}
                          value={inputMaster.date || null}
                          onAccept={handleAccept}
                          renderInput={(params) => <TextField {...params} />}
                        ></DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <Box
                      sx={{
                        p: 0,
                        border: '1px solid #C4C4C4',
                        height: '28px',
                        display: 'flex',
                        width: '190px',
                        marginRight: '5px',
                        borderRadius: '4px',
                        paddingRight: '8px',
                      }}
                    >
                      <input
                        readOnly
                        type="text"
                        style={{
                          marginLeft: '10px',
                          width: '140px',
                          height: '27px',
                          border: 0,
                          cursor: 'pointer',
                        }}
                        name="userName"
                        placeholder="담당자명"
                        value={inputMaster.userName}
                        onChange={onChangeHandler}
                        onClick={() => {
                          toggleModal(openManager, 'manager');
                        }}
                      />
                      <SearchIcon
                        sx={{ marginLeft: 'auto', marginTop: '3px', cursor: 'pointer' }}
                        onClick={() => {
                          toggleModal(openManager, 'manager');
                        }}
                      />
                    </Box>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <Box
                      sx={{
                        p: 0,
                        border: '1px solid #C4C4C4',
                        height: '28px',
                        display: 'flex',
                        width: '190px',
                        marginRight: '5px',
                        borderRadius: '4px',
                        paddingRight: '8px',
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          marginLeft: '10px',
                          width: '140px',
                          height: '27px',
                          border: 0,
                          cursor: 'pointer',
                        }}
                        name="businessName"
                        placeholder="거래처명"
                        value={inputMaster.businessName}
                        onChange={onChangeHandler}
                        onClick={() => {
                          toggleModal(openBusiness, 'business');
                        }}
                      />
                      <SearchIcon
                        sx={{ marginLeft: 'auto', marginTop: '3px', cursor: 'pointer' }}
                        onClick={() => {
                          toggleModal(openBusiness, 'business');
                        }}
                      />
                    </Box>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading.current ? (
                  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <CircularProgress />
                  </Box>
                ) : masters.length > 0 ? (
                  masters.map((master, index) => (
                    <MasterItem
                      key={index}
                      no={index}
                      code={master.code}
                      date={master.date}
                      username={master.userName}
                      businessname={master.businessName}
                      releaseDetail={releaseDetail}
                      checkedRow={checkedRow}
                      masterStateUpdate={masterStateUpdate}
                      rowColor={rowColor}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center' }}>
                      등록된 품목이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default ReceiveMaster;
