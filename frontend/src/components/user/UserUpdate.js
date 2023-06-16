import {
  Box,
  Button,
  FormControl,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import sha256 from "sha256";
import Swal from "sweetalert2";

export default function UserUpdate({
  itemUpdateHandler,
  userDetail,
  item,
  setItem,
}) {
  const [target, setTarget] = useState();

  useEffect(() => {
    setTarget(userDetail.id);
    console.log(userDetail);
    setItem({
      id: userDetail.id,
      name: userDetail.name,
      phone: userDetail.phone,
    });
  }, [userDetail]);

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
    const obj = { ...item };
    console.log(obj);
    if (obj.id === "" || obj.id === undefined || obj.id === null) {
      Swal.fire({
        title: "",
        text: `정보를 수정할 유저를 선택해주세요`,
        icon: "warning",
      });
      return;
    }
    if (
      obj.password !== "" &&
      obj.password !== undefined &&
      !/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{9,20}$/g.test(obj.password)
    ) {
      Swal.fire({
        title: "",
        text: `비밀번호 양식 오류!\n영어, 숫자를 포함한 최소 9자 최대 20자여야 합니다.`,
        icon: "warning",
      });
      return;
    }
    if (obj.name === "" || obj.name === undefined) {
      Swal.fire({
        title: "",
        text: `이름을 입력해 주세요.`,
        icon: "warning",
      });
      setItem({ ...item, name: userDetail.name });
      return;
    }
    if (obj.phone === "" || obj.phone === undefined || obj.phone.length < 13) {
      Swal.fire({
        title: "",
        text: `핸드폰 번호 양식이 잘못되었습니다.`,
        icon: "warning",
      });
      setItem({ ...item, phone: userDetail.phone });
      return;
    }

    if (obj.password !== "" && obj.password !== undefined) {
      obj.password = sha256(obj.password);
    }

    itemUpdateHandler(obj, target);
    setItem({ code: "", name: "", phone: "" }); // update form data 초기화
  };
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
      <FormControl
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 3,
        }}
      >
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
                  아이디
                </TableCell>

                <TableCell align="left" sx={{ padding: "6px 0px 6px 4px" }}>
                  <TextField
                    disabled
                    type="text"
                    id="id"
                    name="id"
                    variant="outlined"
                    size="small"
                    InputProps={{ sx: { height: 30, width: "100%" } }}
                    value={item.id || ""}
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
                    textAlign: "center",
                    fontWeight: "800",
                  }}
                >
                  이름
                </TableCell>

                <TableCell align="left" sx={{ padding: "6px 0px 6px 4px" }}>
                  <TextField
                    type="text"
                    id="name"
                    name="name"
                    size="small"
                    InputProps={{ sx: { height: 30, width: "100%" } }}
                    onChange={changeHandler}
                    value={item.name || ""}
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
                    textAlign: "center",
                    fontWeight: "800",
                  }}
                >
                  전화번호
                </TableCell>

                <TableCell align="left" sx={{ padding: "6px 0px 6px 4px" }}>
                  <TextField
                    type="text"
                    id="phone"
                    name="phone"
                    size="small"
                    value={item.phone || ""}
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
                    textAlign: "center",
                    fontWeight: "800",
                  }}
                >
                  비밀번호
                </TableCell>

                <TableCell align="left" sx={{ padding: "6px 0px 6px 4px" }}>
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    variant="outlined"
                    size="small"
                    InputProps={{ sx: { height: 30, width: "100%" } }}
                    sx={{ width: "100%" }}
                    value={item.password || ""}
                    onChange={changeHandler}
                    placeholder="영어,숫자 포함 최소 9자~최대20자"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          type="submit"
          variant="outlined"
          sx={{ marginTop: 2, width: "100%" }}
        >
          수정
        </Button>
      </FormControl>
    </Grid>
  );
}
