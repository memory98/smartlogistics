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
  setIsButtonDisabled,
  isButtonDisabled,
  outdetails,
  updateReceiveCnt }) => {
  //const isAnyCheckedFalse = data.some(item => item.checked === false);
  // console.log(outdtail)
  // console.log("==== data ==== ")
  // console.log(data);
  // data: [] === checkedButtons, deleteData: [{}, {}, ...] === rendering되는 state(data)
  //  const newData = checkedButtons.filter(item => !data.some(deleteItem => deleteItem.no === item));
  // 


  // const [stockcnt, setStockcnt] = useState(0);
  // const [inputValue, setInputValue] = useState("");


  // const handleInputChanges = (no, value) => {
  //   console.log("뷀유",value);
  //   setData((prevData) =>
  //     prevData.map((item) => {
  //       if (item.no === no) {
  //         return { ...item, inputValue: value };


  //       }
  //       return item;
  //     })
  //   );
  // };

  // const handleAddButtonClick = () => {
  //   const inputNumber = parseInt(inputValue);
  //   if (inputNumber <= stockcnt) {
  //     setStockcnt(inputNumber);
  //     setInputValue("");
  //     // 추가 버튼을 눌렀을 때 stockcnt 값이 입력한 숫자보다 큰 경우에 대한 처리를 여기에 추가
  //   } else {
  //     alert("입력한 숫자보다 stockcnt 값이 큽니다.");
  //   }
  // };
  const [selectList, setSelectList] = React.useState([]);
  const [addList, setAddList] = React.useState([]);

  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const deleteChulgo = (index) => {
    // 삭제하는 로직 추가필요
    let remainedData = data.filter((item) => !item.checked);
    setData(remainedData);
  }

  // const outdata= ()=>{
  //   if(outdetails.length > 0){
  //     <Modal4OutItem
  //     key={detail.no}
  //     no1={detail.no}
  //     mcode={detail.masterCode}
  //     pcode={detail.productCode}
  //     pname={detail.productName}
  //     stockcnt={detail.count}
  //     receivecnt={detail.receivecnt}
  //     selectedRowData={selectedRowData}
  //     checked={detail.checked}
  //     chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
  //     checkedButtons={checkedButtons}
  //     changeHandler={changeHandler}
  //     data={data}
  //     setData={setData}
  //     outdetails={outdetails}
  //   />
  //   }
  // }


  //   const filteredRows = checkedRow.filter(row =>
  //   row.detail.some(detail =>
  //     data.some(item => item.no === detail.no && detail.state === 't')
  //   )
  // );

  useEffect(() => {
    console.log("111 " + checkedButtons);
  }, [checkedButtons])

  const allCheckBox = (e) => {

    // e.currentTarget.checked;
    // 체크됐으면 data state에 checked 프로퍼티 true || 해제됐으면 false

    if (e.currentTarget.checked) {
      console.log("선택됨")
      const updatedData = data.map(item => ({
        ...item,
        checked: true,
      }));
      setData(updatedData)
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
  // const dataa =Object.assign(data);
  // console.log(dataa);
  // const dataas = [dataa];
  // console.log(dataas);

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
                          // allCheckBox(e.currentTarget.checked);
                          handleSelectAllClick(e, outdetails, addList, setSelectList);
                        }}
                        checked={isAllChecked}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                      출고번호
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
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
                      {data.map((datas) => (
                        <Modal4OutItem
                          key={datas.no}
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
                          updateReceiveCnt={updateReceiveCnt}
                        />
                      ))}
                      {outdetails.map((detail) => (
                        <Modal4OutItem
                          key={detail.no}
                          detail={detail}
                          no={detail.no}
                          mcode={detail.masterCode || ""}
                          pcode={detail.productCode}
                          pname={detail.productName}
                          stockcnt={detail.count}
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
                          updateReceiveCnt={updateReceiveCnt}
                        />
                      ))}
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
              sx={{
                mt: 2,
                color: "#41719C",
                border: "2px solid #41719C",
                borderRadius: "5px",
                float: "right",
                ":hover": {
                  color: "#fff",
                  backgroundColor: "#41719C",
                },
                height: "36px",
              }}
              onClick={() => {
                releaseAdd(data.filter((itemA) => !details.find((itemB) => itemB.productCode === itemA.productCode)))
                handleButtonClick('releaseInsert', data)
              }}>
              <strong>등록</strong>
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Modal4Outlist;