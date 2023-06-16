import {
  Button,
  FormControl,
  TextField,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import sha256 from "sha256";

// user 등록
const Register = ({ open, onClose, itemAddHandler }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onClickHandler = () => {
    setId("");
    setPassword("");
    setCheckPassword("");
    setName("");
    setPhone("");
    setOnSubmit(false);
    setHasError(false);
    onClose();
  };

  // const [file, setFile] = useState('');
  const autoHyphen = (target) => {
    return target
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
  };

  const handlePhone = (e) => {
    if (e.target.value.length > 13) {
      return;
    }

    setPhone(autoHyphen(e.target.value));
  };

  //  const handleFile = e => {
  //   setFile(e.target.files[0]);
  //   console.log(e.target.files[0]);
  //  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const file = e.target["file"].files[0];

    if (
      id === "" ||
      password === "" ||
      name === "" ||
      name.length > 12 ||
      phone === "" ||
      phone.length < 13 ||
      password !== checkPassword ||
      !/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{0,12}$/g.test(id) ||
      !/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{9,20}$/g.test(password)
    ) {
      setOnSubmit(true);
      return;
    }
    setOnSubmit(false);
    console.log("file:" + file);
    if (!(await registerUser(file))) {
      document.getElementById("id").focus();
      setHasError(true);
      return;
    }

    onClickHandler();
  };

  const registerUser = async (file) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", sha256(password));
    formData.append("name", document.getElementById("username").value);
    formData.append("phone", phone);
    formData.append("role", "user");
    formData.append("file", file);
    return await itemAddHandler(formData);
  };
  return (
    <Box>
      <Modal open={open}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <FormControl component="form" onSubmit={handleRegisterSubmit}>
            <h1>사원 관리</h1>
            <br></br>
            <TextField
              type="text"
              id="id"
              placeholder="id"
              name="id"
              variant="outlined"
              size="small"
              value={id}
              onChange={(e) =>
                setId(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))
              }
              error={hasError}
            />
            <Typography
              sx={{ color: "red" }}
              id="issue-id"
              display={onSubmit ? "block" : "none"}
            >
              {id === ""
                ? "id가 빈값입니다."
                : !/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{0,12}$/g.test(id)
                ? "영어, 숫자를 하나씩 포함한 최대 12자여야 합니다."
                : " "}
            </Typography>
            <br></br>
            <TextField
              type="password"
              id="password"
              placeholder="password"
              name="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))
              }
            />
            <Typography
              sx={{ color: "red" }}
              id="issue-password"
              display={onSubmit ? "block" : "none"}
            >
              {password === ""
                ? "password가 빈값입니다."
                : !/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{9,20}$/g.test(password)
                ? "영어, 숫자를 포함한 최소 9자 최대 20자여야 합니다."
                : " "}
            </Typography>
            <br></br>
            <TextField
              type="password"
              id="check-password"
              placeholder="check-password"
              name="check-password"
              variant="outlined"
              size="small"
              value={checkPassword}
              onChange={(e) =>
                setCheckPassword(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))
              }
            />
            <Typography
              sx={{ color: "red" }}
              id="issue-check-password"
              display={onSubmit ? "block" : "none"}
            >
              {checkPassword === ""
                ? "checkPassword이 빈값입니다."
                : checkPassword !== password
                ? "password와 일치하지 않습니다."
                : ""}
            </Typography>
            <br></br>
            <TextField
              type="text"
              id="username"
              placeholder="username"
              name="username"
              size="small"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Typography
              sx={{ color: "red" }}
              id="issue-name"
              display={onSubmit ? "block" : "none"}
            >
              {name === ""
                ? "name가 빈값입니다."
                : name.length > 12
                ? "이름은 12자 이하로 설정해야 합니다."
                : " "}
            </Typography>
            <br></br>
            <TextField
              type="text"
              id="phone"
              placeholder="phone"
              name="phone"
              size="small"
              value={phone}
              onChange={handlePhone}
            />
            <Typography
              sx={{ color: "red" }}
              id="issue-phone"
              display={onSubmit ? "block" : "none"}
            >
              {phone !== "" ? " " : "phone가 빈값입니다."}
            </Typography>

            <TextField
              id="file"
              name="file"
              type="file"
              variant="outlined"
              size="small"
              sx={{
                marginTop: 1,
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                sx={{
                  marginTop: 2,
                }}
                type="submit"
                variant="outlined"
              >
                회원가입
              </Button>
              <Button
                sx={{
                  marginTop: 2,
                }}
                variant="outlined"
                onClick={onClickHandler}
              >
                취소
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default Register;
