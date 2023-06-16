import { TextField, Box, Checkbox, TableCell, TableRow, checkboxClasses } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Modal4Outlist from "./Modal4Outlist";
import Modal4DetailItem from "./Modal4DetailItem";

const Modal4OutItem = ({
  selectedRowData, onSave, onClose,
  detail,
  index,
  no,
  mcode,
  pcode,
  pname,
  psize,
  putil,
  receivecnt,
  stockcnt,
  cnt,
  selectedData,
  receiveCode,
  checked,
  chulgoItemOnChangeCheck,
  changeHandler,
  checkedButtons,
  data,
  setData,
  outdetails,
  children,
  updateReceiveCnt,
  submitOutitem
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

  const [count, setCount] = useState(stockcnt);
  const handleEnterKeyPress = (index) => {
    // 값이 있는 TextField는 건너뛰기 (추가)
    const nextIndex = index + 1;
    const nextDetailItem = document.getElementById(`releaseCnt-${nextIndex}`);

    if (nextDetailItem) {
      nextDetailItem.focus();
    }

  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.value !== '' ? handleEnterKeyPress(index) : alert('값을 입력해야 합니다');
  };
  const onChangeCnt = (e) => {
    console.log('e.target.value',e.target.value)  // 3  
    const updatedData = data.map((item, index) => {
      if (item.no === no) {
        return {
          ...item,
          releaseCnt: e.target.value
        };
      }
      return item;
    });
    setData(updatedData);
  }
console.log(pcode, data.find(item => item.no === no && item.mcode === receiveCode)?.checked);

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
        ...(outdetails && outdetails.find(item => item?.no === no) ? { background: "#EFF8FF" } : {}),
      }}
      id="searchRow"
    >
      <TableCell sx={{ p: 0 }}>
        <Checkbox
          size="small"
          id="test"
          name="test"
          onChange={(e) => {
            chulgoItemOnChangeCheck(no);
            changeHandler(e.currentTarget.checked, no);
          }}
          // checked={(data && data.find(item => tem.no === no)?.checked) || (outdetails && outdetails.find(item => item.no === no))}
          checked={data && data.find(item => item.pcode === pcode && item.mcode === receiveCode)?.checked || (outdetails && outdetails.some(item => item.no === no && item.receiveCode === receiveCode))}
          disabled={outdetails && outdetails.find(item => item.no === no)}
          ref={checkboxRef}
        />
      </TableCell>
      <TableCell>{mcode}</TableCell>
      <TableCell>{receiveCode || ""}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell>{pname}</TableCell>
      {/* <TableCell>{pname.length>10? pname.substring  (0,10)+'...' : pname}</TableCell> */}
      <TableCell >{stockcnt}</TableCell> {/* 주석은 이렇게 */}
      <TableCell >
        {outdetails && outdetails.find(item => item.no === no) ? (<span>{cnt}</span>) : (
          <TextField
            type="number"
            id={`releaseCnt-${index}`}
            name='releaseCnt'
            placeholder={stockcnt}
            onKeyPress={handleKeyDown}
            onChange={(e) => {
              const enteredValue = e.target.value;
              if (enteredValue <= stockcnt) {
                onChangeCnt(e, no);
              } else {
                e.target.value = stockcnt; // 입력한 값을 stockcnt로 변경
              }
            }}
            onKeyDown={(e) => {
              const enteredValue = e.target.value + e.key; // 현재 값과 눌린 키를 합친 값
              if (parseInt(enteredValue) > stockcnt) {
                e.preventDefault(); // 키보드 입력 막기
                e.target.value = stockcnt;
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
