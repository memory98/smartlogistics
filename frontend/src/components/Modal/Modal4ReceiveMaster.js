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
  CircularProgress
} from "@mui/material";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import Modal4MasterItem from "./Modal4MasterItem";
import { customFetch } from '../custom/customFetch';

import checkImg from "../../assets/img/checkmark.png";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 43px;
  }
`;
const Modal4ReceiveMaster = ({
  masters,
  modal4receiveDetail,
  checkedRow,
  setCheckedRow,
  rowColor,
  updatePumokList,
  setPumokList,
  modal4receiveMasterSearch,
  loading,
  details }) => {


  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (clientHeight + scrollTop + 10 > scrollHeight) {
      modal4receiveMasterSearch(null, 'load');
    }
  }

  useEffect(() => {
    const tablePro = document.getElementById('table');
    tablePro.addEventListener('scroll', handleWindowScroll);
    return () => {
      tablePro.removeEventListener('scroll', handleWindowScroll);
    }
  }, []);


  // useEffect(() => {
  //   //console.log('checkedRow', checkedRow);
  //   }, [checkedRow]);

  const masterAllCheckBox = (checked) => {

    const updatedCheckedRow = checkedRow.map(row => {
      return {
        ...row,
        state: checked ? 't' : 'f',
      };
    });

    setCheckedRow(updatedCheckedRow);
    // pumokList 수정
    if (!checked)
      setPumokList([]);
    else {
      let promiseList = [];
      masters.forEach((ipgoItem, index) => {
        //console.log(ipgoItem.code);
        let code = ipgoItem.code;
        const resultOrPromise = customFetch(`/api/receive/detail1?rc=${code}`, { method: 'get' })
        promiseList.push(resultOrPromise);
      })
      Promise.all(promiseList).then((allList) => {
        //console.log('allList', allList);
        let pumokListTemp = allList.map((ipgoItem) => {
          let pumokListOfOneIpgoItem = ipgoItem.data;
          return pumokListOfOneIpgoItem;
        });
        let pumokList = [];
        pumokListTemp.forEach((element) => {
          pumokList = [...pumokList, ...element];
        })
        //console.log('pumokList', pumokList);
        setPumokList(pumokList);
      });
    }
  }
  /** 체크박스 클릭 시 master state의 값을 true, false로 변경해주는 함수 */
  const masterStateUpdate = (checked, code) => {
    console.log('masterStateUpdate', checked, code);
    setCheckedRow(checkedRow.map((row) => {
      if (row.master === code) {
        const newState = checked ? 't' : 'f';
        const newDetail = checked ? row.detail : row.detail.map(d => ({ ...d, state: 'f' }));
        return {
          ...row,
          state: newState,
          detail: newDetail,
        };
      } else {
        return row;
      }
    }));

    // 내가 하고싶은 일 기술
    customFetch(`/api/receive/detail1?rc=${code}`, { method: 'get' }).then((json) => {
      //console.log('-----------------------------품목리스트', json.data);
      updatePumokList(checked, json.data);
    });
  }


  return (
    <Grid item
      xs={12}
      md={12}
      style={{ height: '25%' }}
    >
      <Box
        sx={{
          width: "100%",
          marginBottom: 0,
          marginTop: '-20px',
        }}
      >
        <Box sx={{ display: "flex", paddingLeft: 0 }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 800,
              marginBottom: '5px',
            }}
          >
            입고리스트
          </span>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <FormControl component="form" id="table">
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                paddingTop: 0,
                boxShadow: "none",
                height: 157,
              }}
              onScroll={handleWindowScroll}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow sx={{ height: 3 }}>
                    <TableCell sx={{ width: "5%", backgroundColor: "#F6F7F9", p: 0, }}>
                      <Checkbox 
                        size="small"
                        onChange={(e) => {
                          masterAllCheckBox(e.currentTarget.checked)
                        }}
                          checked={
                            checkedRow.every((row) => row.state === 't') &&
                            checkedRow.length !== 0 
                        }
                         />
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      입고번호
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      입고일
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      담당자
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      거래처
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
                  ) :
                    masters && masters.length > 0 ? (
                      masters.map((master, index) => (
                        <Modal4MasterItem
                          key={index}
                          no={index}
                          code={master.code}
                          date={master.date}
                          username={master.userName}
                          businessname={master.businessName}
                          modal4receiveDetail={modal4receiveDetail}
                          checkedRow={checkedRow}
                          setCheckedRow={setCheckedRow}
                          masterStateUpdate={masterStateUpdate}
                          rowColor={rowColor}
                          state={master.state}
                          details={details}
                        />
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                          등록된 입고가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </FormControl>
        </Box>
      </Box>
    </Grid>
  );
};
export default Modal4ReceiveMaster;
