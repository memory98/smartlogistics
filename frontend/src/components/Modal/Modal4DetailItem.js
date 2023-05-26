import { Box, Checkbox, TableCell, TableRow, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Modal4OutItem from './Modal4OutItem';
import Modal4 from "./Modal4";
const Modal4DetailItem = ({
  index,
  no,
  mcode,
  pcode,
  pname,
  psize,
  putil,
  receivecnt,
  stockcnt,
  item,
  onSave,
  onRowClick,
  clicks,
  code,
  checkedRow,
  masterStateUpdate,
  rowColor,
  setCheckedRow,
  data,
  setData,
  outdetails,
  textClick,
  modal4receiveDetail,
  setreceiveDetail,
  updateReceiveCnt,
  duplicate,
  truemon,
  isButtonDisabled,
  setIsButtonDisabled,
  graybutton,
  disabled,
  isInChulgo,
  allCheckboxesDisabled
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedStockCnt, setEditedStockCnt] = useState(stockcnt);
  const [checked, setChecked] = useState(false);
  const [selectedDataArray, setSelectedDataArray] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null); // 선택된 행 데이터 추가
  const [newdata, setnewdata] = useState(null);
  // const [count, setCount] = useState(stockcnt);
  const [clickedItems, setClickedItems] = useState();
  const [disable, setDisable] = useState();

  console.log('data', data)
  console.log('outdetails', outdetails)
  // const [value, setValue] = useState(0);
  // const max = receivecnt;

  // const handleInputChange = (event) => {
  //   const inputValue = count;
  //   if (inputValue <= max) {
  //     setValue(inputValue);
  //   } else {
  //     setValue(max);
  //   }
  // }




  // useEffect(() => {
  //   console.log("===== find 확인 ===== ");
  //   console.log(no,data)
  //   console.log(data.filter((item)=> {item.no === no}));

  // }, [data]);




  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit(e);

  //   }
  // };


  const handleBlur = () => {
    updateReceiveCnt(count, no);
    console.log("테에스트", count, no);
  }

  const updatedCheckedRow = (e) => checkedRow.map((row) => {
    const { master, detail } = row;
    if (master === mcode) {
      // console.log('detail', detail);
      const updatedDetail = detail.map((d) => {
        console.log('code', code);
        if (d.no === code) {
          return {
            ...d,
            state: e.currentTarget.checked ? 't' : 'f',
          };
        }
        return d;
      });
      const f = updatedDetail.every(el => el.state === "t") ? "t" : "f";
      return {
        ...row,
        state: f,
        detail: updatedDetail,
      };
    }
    return row;
  });

  // const handleClick = (no) => {
  //   const newData = data.map(item => {
  //     if (item.no === no) {
  //       return {
  //         ...item,
  //         checked: true
  //       };
  //     }
  //     return item;
  //   });
  //   setData(newData);
  // };
  // const isDisabled = (no) => {
  //   const item = data.find(item => item.no === no);
  //   return item && item.checked;
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
        ...(checkedRow.filter(row => row.master === mcode && row.state === "t" && !row.detail.every(item => item.state === "t")).length > 0 || isInChulgo ? { background: "#EFF8FF" } : {}),
      }}
      id="searchRow"
    >

      <TableCell sx={{ p: 0 }}>
        <Checkbox
          size="small"
          onChange={(e) => {
            setCheckedRow(updatedCheckedRow(e));
          }}
          checked={checkedRow.filter(row => (row.master === mcode && row.state === 't') || (row.detail.some(detail => detail.no === code && detail.state === 't'))).length > 0 ? true : false}
          disabled={
            (checkedRow.filter(row => row.master === mcode && row.state === "t"
              && !row.detail.every(item => item.state === "t")).length > 0)
              || ((data.filter(row => (row.receiveCode === mcode && row.productCode === pcode )).length>0)
              && (outdetails.filter(row => (row.receiveCode === mcode && row.productCode === pcode )).length>0))
              ?
              true : (isInChulgo ? true : false)}
        />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{pcode}</TableCell>
      {/* <TableCell>{outdetails.filter(row => (row.receiveCode === mcode && row.productCode === pcode )).length }</TableCell> */}
      <TableCell>{pname.length > 10 ? pname.substring(0, 10) + '...' : pname}</TableCell>
      <TableCell>{psize}</TableCell>
      <TableCell>{putil}</TableCell>
      <TableCell>{receivecnt}</TableCell>
      <TableCell>
        {stockcnt}
        {/* <TextField
  // type="number"
  // id="stockcnt"
  // name="stockcnt"
  // placeholder={receivecnt}
  // onChange={(e) => {
  //   setCount(e.target.value);
  // }}
  // onBlur={handleBlur}
  // InputProps={{
  //   sx: { height: 30 },
  //   inputProps: { min: 0, max: receivecnt},
  // }}
 
></TextField> */}
      </TableCell>
      {/* <Button onClick={() => {
            // const isDuplicateNo = clickedItems.some(item => item.no === no);
          if ( receivecnt >= stockcnt) {
             // 중복된 no가 있거나 receivecnt가 stockcnt 이상인 경우 함수를 실행하지 않음
          clicks({no, mcode, pcode, pname, psize, putil,receivecnt, stockcnt, checked: false});
          // isDisabled(no);
          // setIsButtonDisabled(true);
          graybutton(no);

          console.log("dd");
        }
        console.log(disabled);
        console.log(code);
          }}
         disabled={disabled}
          >저장</Button> */}

    </TableRow>
  );
};
export default Modal4DetailItem;
