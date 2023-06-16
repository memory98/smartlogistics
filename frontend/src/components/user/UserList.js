import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import {
  Box,
  Checkbox,
  FormControl,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserItem from "./Useritem";
import AddIcon from "@mui/icons-material/Add";
import RegisterModal from "./Register";
import SelectedDataDeleteModal from "../Modal/SelectedDataDeleteModal";
import Swal from "sweetalert2";

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 50.5px;
  }
`;

const UserList = ({
  users,
  userDetail,
  deleteItemHandler,
  itemAddHandler,
  setItem,
  setDetail,
  searchKeyword,
  loading,
  rowColor,
  submitError,
}) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  /** Delete를 체크박스 Handler  */
  const changeHandler = (checked, id) => {
    checked
      ? setCheckedButtons((prev) => [...prev, id])
      : setCheckedButtons((prev) => prev.filter((el) => el !== id));
    if (isChecked) {
      setIsChecked(false);
    }
    if (checked) {
      if (!isChecked) {
        users.length === checkedButtons.length + 1
          ? setIsChecked((prev) => !prev)
          : null;
      }
    }
  };
  /** 모두 선택해주는 체크박스 */
  const allCheckBox = (e) => {
    if (!isChecked) {
      setIsChecked(e.target.checked);

      const data = users.map((el) => el.id);
      console.log(data);
      setCheckedButtons(data);
    } else {
      setIsChecked(e.target.checked);
      setCheckedButtons([]);
    }
  };
  //삭제 모달 관련
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setDetail([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    submitError.current = "";
  };

  const modalMessage = () => {
    const length = checkedButtons.length;
    if (submitError.current != "") {
      return submitError.current;
    }
    if (isChecked) {
      return "유저 전체를 삭제하시겠습니까?";
    }
    if (length === 0) {
      return 0;
    }
    if (length === 1) {
      return checkedButtons[0] + "을 삭제하시겠습니까?";
    }
    return length + "명의 유저를 삭제하시겠습니까?";
  };

  const onDeleteButton = () => {
    deleteItemHandler(checkedButtons);
    setCheckedButtons([]);
    setIsChecked(false);
    setItem({ id: "", name: "", phone: "" });
    if (submitError.current == "") {
      handleClose();
    }
  };

  //회원가입 모달
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleRegisterOpen = () => {
    setDetail([]);
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  //체크박스 관련
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    setDetail([]);
  };

  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      searchKeyword.call(this);
    }
  };

  useEffect(() => {
    const tablePro = document.getElementById("table");
    tablePro.addEventListener("scroll", handleWindowScroll);
    searchKeyword.call(this);
    return () => {
      tablePro.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);
  return (
    <Grid
      item
      xs={8}
      sx={{
        width: "100%",
        height: "730px",
        marginRight: 4,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <SelectedDataDeleteModal
        open={open}
        handleClose={handleClose}
        modalMessage={modalMessage}
        checkedButtons={checkedButtons}
        onDeleteButton={onDeleteButton}
      />

      <RegisterModal
        open={registerOpen}
        onClose={handleRegisterClose}
        itemAddHandler={itemAddHandler}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "97%",
            display: "table-column-group",
            textAlign: "right",
          }}
        >
          <AddIcon
            sx={{ padding: "7px", cursor: "pointer", marginLeft: "auto" }}
            onClick={handleRegisterOpen}
          />
          <DeleteIcon
            sx={{ padding: "7px", cursor: "pointer", marginLeft: "auto" }}
            onClick={() => {
              const message = modalMessage();
              message === 0
                ? Swal.fire("", "체크된 데이터가 존재하지 않습니다.", "warning")
                : Swal.fire({
                    text: modalMessage(), // modalMessage()
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "삭제",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const returnData = onDeleteButton();

                      returnData.then((result) => {
                        if (result === "") {
                          Swal.fire(
                            "Deleted!",
                            "삭제가 완료되었습니다",
                            "success"
                          );
                        }
                      });
                    }
                  });
            }}
          />
        </Box>

        <FormControl component="form" id="table">
          <TableContainer
            component={Paper}
            sx={{
              width: "94%",
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 550,
            }}
            onScroll={handleWindowScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ height: 3 }}>
                  <TableCell
                    sx={{
                      width: "10%",
                      backgroundColor: "#F6F7F9",
                      textAlignLast: "center",
                      p: 0,
                    }}
                  >
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        allCheckBox(e);
                      }}
                      checked={isChecked}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "10%",
                      backgroundColor: "#F6F7F9",
                      fontWeight: "800",
                    }}
                  >
                    번호
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "600" }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    이름
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    연락처
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: 2, p: 0 }}></TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : users.length > 0 ? (
                  users.map((user, index) => (
                    <UserItem
                      key={index}
                      no={index}
                      id={user.id}
                      name={user.name}
                      phone={user.phone}
                      userDetail={userDetail}
                      checkedButtons={checkedButtons}
                      changeHandler={changeHandler}
                      handleCheckboxClick={handleCheckboxClick}
                      rowColor={rowColor}
                    />
                  ))
                ) : (
                  <TableRow key={users.length}>
                    <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                      등록된 계정이 존재하지 않습니다.
                    </TableCell>
                  </TableRow>
                )}{" "}
                {/* 어차피 admin 계정은 처음에 무조건 존재하니까 "등록된 계정이 존재하지 않습니다." 이 부분은 필요가 없지 않을까요*/}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default UserList;
