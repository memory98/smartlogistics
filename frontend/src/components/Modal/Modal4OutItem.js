import { TextField, Box, Checkbox, TableCell, TableRow, checkboxClasses } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Modal4Outlist from "./Modal4Outlist";
import Modal4DetailItem from "./Modal4DetailItem";
const Modal4OutItem = ({
  selectedRowData, onSave, onClose,
  detail,
  no,
  mcode,
  pcode,
  pname,
  psize,
  putil,
  receivecnt,
  stockcnt,
  selectedData,
  receiveCode,
  checked,
  chulgoItemOnChangeCheck,
  changeHandler,
  checkedButtons,
  data,
  setData,
  outdetails,
  updateReceiveCnt,
}) => {
  // console.log(mcode);
  // console.log(pcode, pname, stockcnt);
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose(); // 모달 창 닫힘 상태 전달
  };
  const handleSave = () => {
    onSave && onSave(); // 저장 이벤트 전달
    handleClose();
  };
  const checkboxRef = useRef(null)

  useEffect(() => {
    checked === true ? checkboxRef.current.checked = true : null;
  }, [checked]);

  const handleBlur = () => {
    updateReceiveCnt(count, no);
  }

  const [count, setCount] = useState(stockcnt);

  const onChangeCnt = (e) => {
    console.log(e.target.value)
    const updatedData = data.map((item) => {
      if (item.no === no) {
        return {
          ...item,
          releaseCnt: e.target.value
        };
      }
    });
    setData(updatedData)
  }

  //  const handleInputChange = (e) => {
  //   handleInputChanges(no, e.target.value);
  // };

  return (
    <TableRow
      key={no}
      sx={{
        ":hover": {
          background: "#EFF8FF",
          fontWeight: 600,
        },
        "&.Mui-selected": {
          backgroundColor: "#000",
        },
        ...(outdetails && outdetails.find(item => item.no === no) ? { background: "#EFF8FF" } : {}),
      }}
      id="searchRow"
    >

      {/* {chulgoItemOnChangeCheck(no); */}
      <TableCell sx={{ p: 0 }}>
        <Checkbox
          size="small"
          id="test"
          name="test"
          // onChange={(e) => {chulgoItemOnChangeCheck(no); changeHandler(e.currentTarget.checked, no);}}  
          // checked={checkedButtons.includes(no) ? true : false} 
          onChange={(e) => {
            chulgoItemOnChangeCheck(no);
            changeHandler(e.currentTarget.checked, no);
          }}
          checked={data && data.find(item => item.no === no)?.checked || outdetails && outdetails.find(item => item.no === no)}
          disabled={outdetails && outdetails.find(item => item.no === no)}
          ref={checkboxRef}
        />
      </TableCell>
      <TableCell>{mcode}</TableCell>
      <TableCell>{receiveCode || ""}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell>{pname}</TableCell>
      {/* <TableCell>{pname.length>10? pname.substring(0,10)+'...' : pname}</TableCell> */}
      <TableCell >{stockcnt}</TableCell> {/* 주석은 이렇게 */}
      <TableCell >
        {outdetails && outdetails.find(item => item.no === no) ? null : (
          <TextField
            type="number"
            id='releaseCnt'
            name='releaseCnt'
            placeholder={stockcnt}
            onChange={(e) => {
              const enteredValue = e.target.value;
              if (enteredValue <= stockcnt) {
                onChangeCnt(e);
              } else {
                e.target.value = stockcnt; // 입력한 값을 stockcnt로 변경
              }
            }}
            onKeyDown={(e) => {
              const enteredValue = e.target.value + e.key; // 현재 값과 눌린 키를 합친 값
              if (parseInt(enteredValue) > stockcnt) {
                e.preventDefault(); // 키보드 입력 막기
              }

              if (enteredValue==='-') {
                e.preventDefault(); // 키보드 입력 막기
              }
            }}
            InputProps={{
              sx: { height: 30 },
              inputProps: { min: 0, max: stockcnt },
            }}
          ></TextField>
        )}
      </TableCell>
    </TableRow>
  );
};
export default Modal4OutItem;
