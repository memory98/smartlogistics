import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { customFetch } from '../custom/customFetch';
import updateprofileImg from '../../assets/img/updateprofile.png';
import sha256 from 'sha256';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';


const MyData = ({ info, setUserInfo }) => {
  const [pwdchk, setPwdchk] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    password: "",
    phone: "",
    profile: "",
  });
  const [messages, setMessages] = useState({
    pwd: "",
    pwdchk: "",
    name: "",
    phone: "",
  });
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const changeChk = useRef(false);

  useEffect(() => {
    // console.log(previewImage !== '' && previewImage !== null);
    const data = info.user || jwt_decode(localStorage.getItem("token"));
    userDetail(data);
  }, []);
  const userDetail = async (data) => {
    await customFetch(`/api/user/detail?uc=${data.sub}`, {
      method: "get",
    }).then((json) => {
      const { id, name, password, phone, profile } = json.data;
      setUserData({ id, name, password, phone, profile });
      console.log(json.data);
    });
  };
  const autoHyphen = (target) => {
    return target
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
  };
  const onChangeHandle = (e) => {
    changeChk.current = true;
    // 각 필드의 값 변경을 처리하는 함수
    // console.log(e.target);
    const { name, value } = e.target;
    if (
      (name === "password" && value !== userData.password) ||
      (name === "check-password" && value !== pwdchk) ||
      (name === "name" && value !== userData.name) ||
      (name === "phone" && value !== userData.phone)
    ) {
      if (name === "password") {
        console.log(value.replace(/[^0-9a-zA-Z]/g, ""));
        setUserData((prev) => ({
          ...prev,
          password: value.replace(/[^0-9a-zA-Z]/g, ""),
        }));
        // setPwd(value.replace(/[^0-9a-zA-Z]/g, ''));
      }
      if (name === "check-password") {
        setPwdchk(value.replace(/[^0-9a-zA-Z]/g, ""));
      }
      if (name === "name") {
        setUserData((prev) => ({ ...prev, name: value }));
        // setName(value);
      }
      if (name === "phone") {
        if (value.length > 13) {
          return;
        }
        setUserData((prev) => ({ ...prev, phone: autoHyphen(value) }));
      }
    }
  };
  const validateForm = () => {
    // 전화번호 정규표현식
    const phoneRegex = /^010-\d{3,4}-\d{4}$/;
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,20}$/;
    // 유효성 체크를 수행하고 메시지를 반환하는 함수

    // if (userData.password === '' || !userData.password || userData.password == null) {
    //   setMessages((prev) => ({ ...prev, pwd: '비밀번호는 필수입니다' }));
    // }
    console.log("test", pwdRegex.test(userData.password));
    if (userData.password && !pwdRegex.test(userData.password)) {
      setMessages((prev) => ({
        ...prev,
        pwd: "영어, 숫자를 포함한 최소 9자 최대 20자여야 합니다.",
      }));
    } else {
      setMessages((prev) => ({ ...prev, pwd: "" }));
    }

    // if (pwdchk === '' || !pwdchk || pwdchk == null) {
    //   setMessages((prev) => ({ ...prev, pwdchk: '비밀번호 확인은 필수 입니다' }));
    // }
    console.log(userData.password, pwdchk);
    if (userData.password && userData.password !== pwdchk) {
      setMessages((prev) => ({
        ...prev,
        pwdchk: "비밀번호가 일치하지 않습니다.",
      }));
    } else if (pwdchk !== "" && !pwdRegex.test(pwdchk)) {
      setMessages((prev) => ({
        ...prev,
        pwdchk: "영어, 숫자를 포함한 최소 9자 최대 20자여야 합니다.",
      }));
    } else if (userData.password == pwdchk || pwdchk !== "") {
      setMessages((prev) => ({ ...prev, pwdchk: "" }));
    }

    if (userData.name === "") {
      setMessages((prev) => ({ ...prev, name: "이름은 필수입니다" }));
    } else {
      setMessages((prev) => ({ ...prev, name: "" }));
    }

    if (userData.phone === "") {
      setMessages((prev) => ({ ...prev, phone: "전화번호 필수입니다" }));
    } else if (!phoneRegex.test(userData.phone)) {
      setMessages((prev) => ({
        ...prev,
        phone: "유효하지 않은 전화번호입니다.",
      }));
    } else {
      setMessages((prev) => ({ ...prev, phone: "" }));
    }
    console.log(
      userData.id !== "" &&
        userData.name !== "" &&
        userData.phone !== "" &&
        phoneRegex.test(userData.phone) &&
        (userData.password === "" || userData.password === null) &&
        pwdchk === "" &&
        changeChk.current === true
    );
    console.log(
      userData.id !== "" &&
        userData.password !== "" &&
        userData.password !== null &&
        userData.name !== "" &&
        userData.phone !== "" &&
        userData.password === pwdchk &&
        pwdchk !== "" &&
        userData.password.length >= 9 &&
        userData.password.length <= 20 &&
        phoneRegex.test(userData.phone)
    );
    if (
      userData.id !== "" &&
      userData.password !== "" &&
      userData.password !== null &&
      userData.name !== "" &&
      userData.phone !== "" &&
      userData.password === pwdchk &&
      pwdchk !== "" &&
      userData.password.length >= 9 &&
      userData.password.length <= 20 &&
      phoneRegex.test(userData.phone) &&
      changeChk.current === true
    ) {
      onSubmit(true);
      return;
    } else if (
      userData.id !== "" &&
      userData.name !== "" &&
      userData.phone !== "" &&
      phoneRegex.test(userData.phone) &&
      (userData.password === "" || userData.password === null) &&
      pwdchk === "" &&
      changeChk.current === true
    ) {
      onSubmit(true);
      return;
    }
  };
  const onSubmit = async (state) => {
    console.log(file);
    const formData = new FormData();
    formData.append("id", info.user.sub);
    formData.append("name", userData.name);
    formData.append("phone", userData.phone);
    formData.append("role", "user");
    if (userData.password != "" && userData.password != null) {
      // console.log(userData.password);
      formData.append("password", sha256(userData.password));
    }
    if (file != null) {
      formData.append("file", file);
    }
    if (state === true) {
      const headers = {
        Accept: "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("token"),
      };

      await customFetch(`/api/user/updateprofile?uc=${info.user.sub}`, {
        method: "post",
        body: formData,
        headers: headers,
      })
        .then((json) => {
          Swal.fire('', '회원정보 수정이 완료되었습니다', 'success') ;

          setUserData((prev) => ({
            ...prev,
            id: info.user.sub,
            name: json.data.name,
            phone: json.data.phone,
            password: "",
          }));
          setPwdchk("");
          if (json.data.profile != "") {
            localStorage.setItem("profile", json.data.profile);
            setUserInfo((prev) => ({ ...prev, profile: json.data.profile }));
          }
          localStorage.setItem("name", json.data.name);
          setUserInfo((prev) => ({ ...prev, name: json.data.name }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleFileChange = (event) => {
    changeChk.current = true;
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setUserData((prev) => ({ ...prev, profile: selectedFile }));
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "80px",
        marginTop: "5px",
        height: "300px",
        padding: "1%",
      }}
    >
      <Box sx={{ width: "100%", height: "95%", display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {info.user && (
            <Avatar
              alt="img"
              src={
                (previewImage !== "" && previewImage !== null) || previewImage
                  ? previewImage
                  : localStorage.getItem("profile")
              }
              sx={{
                marginTop: "30px",
                marginLeft: "15px",
                height: "160px",
                width: "160px",
              }}
            />
          )}
          <label>{info.name} </label>
          <Box
            sx={{
              marginBottom: "20px",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "1px solid black",
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: "80px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <TextField
              id="file"
              name="file"
              type="file"
              variant="outlined"
              size="small"
              sx={{
                marginTop: 1,
                visibility: "hidden",
                float: "right",
              }}
              onChange={handleFileChange}
              inputProps={{
                accept: ".gif, .jpg, .png",
              }}
            />
            <Box
              component="img"
              alt="img"
              src={updateprofileImg}
              sx={{ height: "25px", width: "25px", marginRight: "4px" }}
              onClick={(event) => {
                document.getElementById("file").click();
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "3%",
            marginTop: "15px",
            flex: 1,
            width: "100%",
          }}
        >
          <TableContainer
            sx={{
              width: "92%",
              // , float: 'right'
            }}
          >
            <Table size="small" sx={{ width: "100%" }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      backgroundColor: "#F6F7F9",
                      width: "30%",
                      fontWeight: "800",
                    }}
                  >
                    아이디
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ padding: "6px 0px 6px 4px", display: "flex" }}
                  >
                    <TextField
                      disabled
                      type="text"
                      id="id"
                      name="id"
                      variant="outlined"
                      size="small"
                      InputProps={{ sx: { height: 30, width: "100%" } }}
                      sx={{ width: "40%" }}
                      value={info.user.sub}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    비밀번호
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ padding: "6px 0px 6px 4px", display: "flex" }}
                  >
                    <TextField
                      type="password"
                      id="password"
                      name="password"
                      variant="outlined"
                      size="small"
                      InputProps={{ sx: { height: 30, width: "100%" } }}
                      sx={{ width: "40%" }}
                      onChange={(e) => onChangeHandle(e)}
                      value={userData.password}
                      placeholder="영어,숫자 포함 최소 9자~최대20자"
                    />
                    {messages.pwd != "" && (
                      <Typography sx={{ color: "red", marginLeft: "5%" }}>
                        {messages.pwd}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    비밀번호 확인
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ padding: "6px 0px 6px 4px", display: "flex" }}
                  >
                    <TextField
                      type="password"
                      id="check-password"
                      name="check-password"
                      variant="outlined"
                      size="small"
                      InputProps={{ sx: { height: 30, width: "100%" } }}
                      sx={{ width: "40%" }}
                      value={pwdchk}
                      onChange={(e) => onChangeHandle(e)}
                      placeholder="영어,숫자 포함 최소 9자~최대20자"
                    />
                    {messages.pwdchk != "" && (
                      <Typography sx={{ color: "red", marginLeft: "5%" }}>
                        {messages.pwdchk}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    이름
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ padding: "6px 0px 6px 4px", display: "flex" }}
                  >
                    <TextField
                      type="text"
                      id="name"
                      name="name"
                      size="small"
                      InputProps={{ sx: { height: 30, width: "100%" } }}
                      sx={{ width: "40%" }}
                      value={userData.name || ""}
                      onChange={(e) => onChangeHandle(e)}
                    />
                    {messages.name != "" && (
                      <Typography sx={{ color: "red", marginLeft: "5%" }}>
                        {messages.name}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      width: "200px",
                      backgroundColor: "#F6F7F9",
                      fontWeight: "800",
                    }}
                  >
                    전화번호
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ padding: "6px 0px 6px 4px", display: "flex" }}
                  >
                    <TextField
                      type="text"
                      id="phone"
                      name="phone"
                      size="small"
                      value={userData.phone || ""}
                      onChange={(e) => onChangeHandle(e)}
                      InputProps={{ sx: { height: 30, width: "100%" } }}
                      sx={{ width: "40%" }}
                    />
                    {messages.phone != "" && (
                      <Typography sx={{ color: "red", marginLeft: "5%" }}>
                        {messages.phone}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              type="submit"
              variant="outlined"
              sx={{ float: "right", width: 100, marginTop: 1 }}
              onClick={validateForm}
            >
              수정
            </Button>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default MyData;
