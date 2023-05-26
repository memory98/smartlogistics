
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

const Modal4MasterItem = ({
  no,
  code,
  date,
  username,
  businessname,
  modal4receiveDetail,
  checkedRow,
  masterStateUpdate,
  rowColor,
  state,
  details,
}) => {
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
  };

  // const [selected, setSelected] = useState(null);
  
  
  return (
    <TableRow
      key={no}
      sx={{
        ':hover':
          rowColor.current === code
            ? ''
            : {
                background: '#EFF8FF',
                fontWeight: 600,
              },
        // background: selected === code ? "#EFF8FF" : "",
        // fontWeight: selected === code ? 600 : "",
        cursor: "pointer",
        "&.Mui-selected": {
          backgroundColor: "#000",},
          backgroundColor: rowColor.current === code ? '#DCF1FF' : '#FFF',
        
      }}
      id="searchRow"
      onClick={() => {
        modal4receiveDetail(code || "");
        // setSelected(selected === code ? null : code);
      }}
    >
      <TableCell  sx={{ p: 0 }}>
        <Checkbox
          size="small"
          checked={checkedRow.some(
            (row) =>
              row.master === code &&
              (row.state === "t" ||
                (row.detail.length > 0 && row.detail.every((d) => d.state === "t")))
          )}
          disabled={checkedRow.some(
            (row) =>
              row.master === code && row.state === 't' && row.detail.length !== 0 && row.detail.every((d) => d.state === 't')
          )}
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
    </TableRow>
  );
};


 export default Modal4MasterItem;
