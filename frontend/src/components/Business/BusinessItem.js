import React, { useState, useRef } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

/* Ref를 사용해서 값 가져와보쟈 */
function BusinessItem({
  no,
  code,
  name,
  phone,
  businessDetail,
  checkedButtons,
  changeHandler,
  handleCheckboxClick,
  rowColor,
}) {
  const refCode = useRef(null);

  return (
    <TableRow
      sx={{
        ":hover":
          rowColor.current === code
            ? ""
            : {
                background: "#EFF8FF",
                fontWeight: 600,
              },
        backgroundColor: rowColor.current === code ? "#DCF1FF" : "#FFF",
      }}
      id="searchRow"
      onClick={() => {
        businessDetail(code || "");
      }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox
          size="small"
          onChange={(e) => {changeHandler(e.currentTarget.checked, code)}}
          checked={checkedButtons.includes(code) ? true : false}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell>{no + 1}</TableCell>
      <TableCell id="code" ref={refCode}>
        {code}
      </TableCell>
      <TableCell id="name" title={name}>
        {name.length > 10 ? name.substring(0, 10) + "..." : name}
      </TableCell>
      <TableCell>{phone}</TableCell>
    </TableRow>
  );
}

export default BusinessItem;
