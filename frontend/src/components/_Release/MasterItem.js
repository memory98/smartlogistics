import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useEffect } from "react";

const MasterItem = ({
  no,
  code,
  date,
  username,
  businessname,
  releaseDetail,
  checkedRow,
  masterStateUpdate,
  rowColor
}) => {
  
  /** 이벤트 캡처링 - 이벤트 전파 막기 */
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <TableRow
      key={no}
      sx={{
        ":hover":
          rowColor.current === code
            ? ""
            : {
                background: "#EFF8FF",
                fontWeight: 600,
              },
        "&.Mui-selected": {
          backgroundColor: "#000",
        },
        backgroundColor: rowColor.current === code ? "#DCF1FF" : "#FFF",
      }}
      id="searchRow"
      onClick={() => {
        releaseDetail(code || "");
      }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox 
            size="small"
            checked={checkedRow.some(row => row.master === code && (row.state === 't' || (row.detail.length > 0 && row.detail.every(d => d.state === 't'))))}
            disabled={checkedRow.some(row => (row.master === code && row.state === "t") && row.detail.length !== 0 && row.detail.every(d => d.state === "t"))}
            onChange={(e) => {
              masterStateUpdate(e.currentTarget.checked, code);
            }}
            onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell id="code">{code}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{businessname}</TableCell>
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
      <TableCell></TableCell>
    </TableRow>
  );
};

export default MasterItem;
