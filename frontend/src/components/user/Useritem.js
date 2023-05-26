import React, { useRef } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

const Useritem = ({
  no,
  id,
  name,
  phone,
  userDetail,
  checkedButtons,
  changeHandler,
  handleCheckboxClick,
  rowColor,
}) => {
  const refCode = useRef(null);
  return (
    <TableRow
      key={no}
      sx={{
        ":hover":
          rowColor.current === id
            ? ""
            : {
                background: "#EFF8FF",
                fontWeight: 600,
              },
        backgroundColor: rowColor.current === id ? "#DCF1FF" : "#FFF",
      }}
      id="searchRow"
      onClick={() => {
        console.log(id);
        userDetail(id || "");
      }}
    >
      <TableCell align="center" sx={{ p: 0 }}>
        <Checkbox
          size="small"
          onChange={(e) => {
            //console.log(`출력: ${(e.currentTarget.checked, code)}`);
            changeHandler(e.currentTarget.checked, id);
          }}
          checked={checkedButtons.includes(id) ? true : false}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell>{no + 1}</TableCell>
      <TableCell id="code" ref={refCode}>
        {id}
      </TableCell>
      <TableCell>
        {name.length > 10 ? name.substring(0, 10) + "..." : name}
      </TableCell>
      <TableCell>{phone}</TableCell>
    </TableRow>
  );
};

export default Useritem;
