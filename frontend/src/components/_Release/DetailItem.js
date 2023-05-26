import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import React from "react";

const DetailItem = ({
  no,
  code, // release_datail 테이블의 no 값
  rvCode,
  mcode,
  pcode,
  pname,
  psize,
  putil,
  releasecnt,
  checkedRow,
  setCheckedRow
}) => {

  /** detail 행 클릭 시 실행하는 함수 */
  const updatedCheckedRow = (e) => checkedRow.map((row) => {
    const { master, detail } = row;
    if (master === mcode) {
      const updatedDetail = detail.map((d) => {
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
      }}
      id="searchRow"
      // onClick={() => {
      //   receiveDetail(mcode || "");
      // }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox 
            size="small"
            onChange={(e) => {
              setCheckedRow(updatedCheckedRow(e));              
            }}

            checked={checkedRow.filter(row => (row.master === mcode && row.state === 't') || (row.detail.some(detail => detail.no === code && detail.state === 't'))).length > 0 ? true : false}
            disabled={checkedRow.filter(row => row.master === mcode && row.state === "t" && !row.detail.every(item => item.state === "t")).length > 0 ? true : false}
            
        />
      </TableCell>
      <TableCell>{no + 1}</TableCell>
      <TableCell>{rvCode}</TableCell>
      <TableCell>{pcode}</TableCell>
      <TableCell>{pname}</TableCell>
      <TableCell>{psize}</TableCell>
      <TableCell>{putil}</TableCell>
      <TableCell>{releasecnt}</TableCell>
      <TableCell>
        <Box
          sx={{
            width: "70px",
            height: "22px",
            backgroundColor: 'rgba(2, 181, 18, 0.3)',
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: 450, margin: "3px" }}>완료</span>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default DetailItem;
