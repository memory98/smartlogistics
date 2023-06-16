import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Swal from 'sweetalert2';

function BusinessUpdate({ itemUpdateHandler, businessDetail, item, setItem }) {
  const refForm = useRef(null);
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(businessDetail.code);

    setItem({
      code: businessDetail.code,
      name: businessDetail.name,
      phone: businessDetail.phone,
    });
    return () => {};
  }, [businessDetail]);

  const changeHandler = (e) => {
    let { value, name } = e.target;
    if (name === "phone") {
      if (value.length > 13) {
        return;
      }
      value = value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");
    }
    setItem({ ...item, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(item, target);
    if (item.name === "") {
      Swal.fire('', '거래처명은 필수 값입니다.', 'warning');
      setItem({
        code: businessDetail.code,
        name: businessDetail.name,
        phone: item.phone,
      });
      return;
    }
    if (item.phone.length < 13) {
      Swal.fire('', '핸드폰 번호를 모두 적어주세요.', 'warning');
      setItem({
        code: businessDetail.code,
        name: item.name,
        phone: businessDetail.phone,
      });
      return;
    }

    itemUpdateHandler(item, target);
    setItem({ code: "", name: "", phone: "" }); // update form data 초기화
  };
  //
  return (
    <Grid
      item
      xs={4}
      sx={{
        padding: 3,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 800,
        }}
      >
        상세보기
      </span>
      <TableContainer sx={{ marginTop: 3 }}>
        <Table size="small" sx={{ width: "100%" }}>
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  backgroundColor: "#F6F7F9",
                  minWidth: "94px",
                  width: "30%",
                  textAlign: "center",
                  fontWeight: "800",
                  padding: "6px 8px",
                }}
              >
                거래처코드
              </TableCell>

              <TableCell align="left" sx={{ padding: "6px 0px 6px 4px" }}>
                {" "}
                {/* top부터 시계 방향으로 */}
                <TextField
                  id="code"
                  name="code"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={item.code || ""}
                  disabled
                  InputProps={{ sx: { height: 30, width: "100%" } }}
                  sx={{ width: "100%" }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  backgroundColor: "#F6F7F9",
                  width: "30%",
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                거래처명
              </TableCell>

              <TableCell align="left" sx={{ padding: "6px 0px 6px 4px" }}>
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={item.name || ""}
                  onChange={changeHandler}
                  InputProps={{ sx: { height: 30, width: "100%" } }}
                  sx={{ width: "100%" }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  backgroundColor: "#F6F7F9",
                  width: "30%",
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                연락처
              </TableCell>

              <TableCell align="left" sx={{ padding: "6px 0px 6px 4px" }}>
                <TextField
                  id="phone"
                  name="phone"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={item.phone || ""}
                  onChange={changeHandler}
                  InputProps={{ sx: { height: 30, width: "100%" } }}
                  sx={{ width: "100%" }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        type="submit"
        name="submit"
        variant="outlined"
        sx={{ marginTop: 2, width: "100%" }}
        onClick={onSubmitHandler}
      >
        수정
      </Button>
    </Grid>
  );
}

export default BusinessUpdate;
