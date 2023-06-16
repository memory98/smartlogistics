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

  const handleBlur = () => {
    updateReceiveCnt(count, no);
    console.log("테에스트", count, no);
  }

  const updatedCheckedRow = (e) => checkedRow.map((row) => {
    const { master, detail } = row;
    if (master === mcode) {
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
          checked={checkedRow.filter(row => (
            row.master === mcode && row.state === 't') || 
            (row.detail.some(detail => detail.no === code && 
              detail.state === 't'))).length > 0 
              || ((data.filter(row => (row?.receiveCode === mcode && row?.productCode === pcode )).length>0)
              || (outdetails.filter(row => (row?.receiveCode === mcode && row?.productCode === pcode )).length>0))
              ? true : false}
          disabled={
            (checkedRow.filter(row => row.master === mcode && row.state === "t"
              && !row.detail.every(item => item.state === "t")).length > 0)
              || ((data.filter(row => (row?.receiveCode === mcode && row?.productCode === pcode )).length>0)
              || (outdetails.filter(row => (row?.receiveCode === mcode && row?.productCode === pcode )).length>0))
              ?
              true : (isInChulgo ? true : false)}
        />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{pcode}</TableCell>
      {/* <TableCell>{outdetails.filter(row => (row.receiveCode === mcode && row.productCode === pcode )).length }</TableCell> */}
      <TableCell>{pname?.length > 10 ? pname.substring(0, 10) + '...' : pname}</TableCell>
      <TableCell>{psize}</TableCell>
      <TableCell>{putil}</TableCell>
      <TableCell>{receivecnt}</TableCell>
      <TableCell>
        {stockcnt}
      </TableCell>
    </TableRow>
  );
};
export default Modal4DetailItem;
