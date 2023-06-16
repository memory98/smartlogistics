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
  Button,
  newData,
  checkedRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import Modal4DetailItem from "./Modal4DetailItem";
import checkImg from "../../assets/img/checkmark.png";
import Modal4OutItem from "./Modal4OutItem";
/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 50.5px;
  }
`;
const Modal4Outlist = ({
  outdtail,
  modal4outlistDetail,
  selectedRowData,
  data,
  chulgoItemOnChangeCheck,
  setData,
  handleButtonClick,
  details,
  releaseAdd,
  checkedRow,
  setIsButtonDisabled,
  isButtonDisabled,
  outdetails,
  updateReceiveCnt,
  setCheckedRow
}) => {
  const [selectList, setSelectList] = useState([]);
  const [addList, setAddList] = useState([]);

  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const deleteChulgo = (index) => {
    // 삭제하는 로직 추가필요
    let remainedData = data.filter((item) => !item.checked);
    setData(remainedData);
  }
  console.log("========== Modal4 Out List Data ==========");
  console.log(data);
  console.log(outdetails);

  useEffect(() => {
    console.log("111 " + checkedButtons);
  }, [checkedButtons])

  const allCheckBox = (checked) => {
    if (checked) {
      console.log("선택됨")
      const updatedData = data.map(item => ({
        ...item,
        checked: true,
      }));
      setData(updatedData);
    }
    else {
      const updatedData = data.map(item => ({
        ...item,
        checked: false,
      }));
      setData(updatedData)
      const updatedCheckedButtons = isChecked ? data.map(item => item.no) : [];
      setCheckedButtons(updatedCheckedButtons);
    }
  }

  // all chk
  const handleSelectAllClick = (event, _totalList, _exceptionList, _setList) => {
    if (event.target.checked) {
      const newSelected = _totalList.filter((itemA) => !_exceptionList.find((itemB) => itemB.productCode === itemA.productCode));
      _setList(newSelected);
      return;
    }
    _setList([]);
  };

  /** delete 체크박스 Handler  */
  const changeHandler = (checked, no) => {
    console.log(`checked: ${checked}, no: ${no}`);
    if (checked) {
      setCheckedButtons([...checkedButtons, no]);
      console.log('체크 반영 완료');
      console.log(checkedButtons);
      console.log(checkedButtons.length);
    } else {
      // 클릭된 'code'랑 같으면 제거해서 새로운 배열을 만듬
      setCheckedButtons(checkedButtons.filter(el => el !== no));
      console.log('체크 해제 반영 완료');
    }
  };
  const submitOutitem = () => {
    console.log('data onClick : ');
    console.log(data);    // stockcnt - (String)releaseCnt
    if (data.some((item) => item.releaseCnt === '0')) {
      console.log('탈출!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      return;
    }
    const newData = data.map(item => {
      return {...item, stCnt: item.stockcnt - parseInt(item.releaseCnt)}

    });
    console.log(newData);
    releaseAdd(newData.filter((itemA) => !details.find((itemB) => itemB.productCode === itemA.productCode)))
    handleButtonClick('releaseInsert', newData);
    setData([]);
  }

  console.log('Object.keys(outdetails[0])', Object.keys(outdetails[0]).length > 0);
  const isAllChecked = data.length > 0 ? data.every(item => item.checked) : false;
  return (
    <Grid item sx={12} md={12} style={{ height: '25%' }}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', }}>
          <span style={{ fontSize: "15px", fontWeight: 900, }}>
            출고리스트
          </span>
          <DeleteIcon onClick={() => deleteChulgo()} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <FormControl component="form">
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                paddingTop: 0,
                boxShadow: "none",
                height: 157,
                // marginLeft: "40px",
              }}
            // onScroll={handleScroll}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow sx={{ height: 3 }}>
                    <TableCell sx={{ width: "5%", backgroundColor: "#F6F7F9", p: 0 }}>
                      <Checkbox
                        size='small'
                        onChange={(e) => {
                          allCheckBox(e.currentTarget.checked);
                          // handleSelectAllClick(e, outdetails, addList, setSelectList);
                        }}
                        checked={isAllChecked}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "15%", backgroundColor: "#F6F7F9" }}>
                      출고번호
                    </TableCell>
                    <TableCell sx={{ width: "15%", backgroundColor: "#F6F7F9" }}>
                      입고번호
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                      품번
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                      품명
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                      잔량
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                      출고할잔량
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {data.length > 0 || Object.keys(outdetails[0]).length > 0 ? (
                    <>
                      {
                        data.map((datas, index) => (
                          <Modal4OutItem
                            key={index}
                            index={index}
                            no={datas.no}
                            receiveCode={datas.mcode}
                            mcode={""}
                            pcode={datas.pcode}
                            pname={datas.pname}
                            stockcnt={datas.stockcnt}
                            receivecnt={datas.receivecnt}
                            selectedRowData={selectedRowData}
                            checked={datas.checked}
                            chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
                            checkedButtons={checkedButtons}
                            changeHandler={changeHandler}
                            data={data}
                            setData={setData}
                            outdetails={outdetails}
                            children={data}
                            updateReceiveCnt={updateReceiveCnt}
                            submitOutitem={submitOutitem}
                          />
                        ))}
                        {
                          Object.keys(outdetails[0]).length > 0 ? 
                          <>
                          {outdetails.map((detail, index) => (
                            <Modal4OutItem
                              key={index}
                              index={index}
                              detail={detail}
                              no={detail.no}
                              mcode={detail.masterCode || ""}
                              pcode={detail.productCode}
                              pname={detail.productName}
                              stockcnt={detail.stockCnt}
                              cnt={detail.count}
                              receivecnt={detail.receivecnt}
                              receiveCode={detail.receiveCode}
                              selectedRowData={selectedRowData}
                              checked={detail.checked}
                              chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
                              checkedButtons={checkedButtons}
                              changeHandler={changeHandler}
                              data={data}
                              setData={setData}
                              outdetails={outdetails}
                              children={outdetails}
                              updateReceiveCnt={updateReceiveCnt}
                              submitOutitem={submitOutitem}
                            />
                          ))}
                          </>
                          :null
                        }
                      
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                        추가한 품목이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                height: '36px',
                marginLeft: 'auto',
              }}
              onClick={submitOutitem}>
              <strong>등록</strong>
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Modal4Outlist;