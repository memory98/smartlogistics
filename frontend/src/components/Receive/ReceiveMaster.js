import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  LoadingSpinner,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import MasterItem from "./MasterItem";
import checkImg from "../../assets/img/checkmark.png";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";
import Swal from "sweetalert2";

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 38.5px;
  }
`;

const ReceiveMaster = ({
  masters,
  receiveDetail,
  nullChkHandler,
  rowColor,
  toggleModal,
  openManager,
  openBusiness,
  inputMaster,
  setInputMaster,
  checkedRow,
  setCheckedRow,
  openDeleteModalInMaster,
  openNullModal,
  masterStateT,
  loading,
  receiveMasterSearch,
  modalMessage,
  deleteMasterHandler,
}) => {
  useEffect(() => {
    console.log(inputMaster);
    nullChkHandler(inputMaster);
    return () => {};
  }, [inputMaster]);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputMaster((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccept = (date) => {
    setInputMaster({ ...inputMaster, date: format(date.$d, "yyyy-MM-dd") });
  };

  const masterAllCheckBox = (checked) => {
    const updatedCheckedRow = checkedRow.map((row) => {
      return {
        ...row,
        state: checked ? "t" : "f",
      };
    });
    setCheckedRow(updatedCheckedRow);
  };
  /** 체크박스 클릭 시 master state의 값을 true, false로 변경해주는 함수 */
  const masterStateUpdate = (checked, code) => {
    setCheckedRow(
      checkedRow.map((row) => {
        if (row.master === code) {
          const newState = checked ? "t" : "f";
          const newDetail = checked
            ? row.detail
            : row.detail.map((d) => ({ ...d, state: "f" }));
          return {
            ...row,
            state: newState,
            detail: newDetail,
          };
        } else {
          return row;
        }
      })
    );
  };
  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      receiveMasterSearch("load");
    }
  };

  useEffect(() => {
    const tablePro = document.getElementById("table");
    tablePro.addEventListener("scroll", handleWindowScroll);
    return () => {
      tablePro.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);
  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        height: 360,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        marginBottom: 1.8,
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", paddingLeft: 3, width: "94%" }}>
        <Box
          component="img"
          src={checkImg}
          sx={{
            width: "30px",
            height: "30px",
          }}
        />
        <span
          style={{
            position: "relative",
            fontSize: "16px",
            fontWeight: 800,
            marginRight: "15px",
            marginTop: "5px",
            marginLeft: "10px",
          }}
        >
          입고리스트
        </span>
        <DeleteIcon
          sx={{
            padding: "7px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
          onClick={() => {
            modalMessage() === 0
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
                    const returnData = deleteMasterHandler(masterStateT);

                    returnData.then((result) => {
                      if (result === "") {
                        Swal.fire(
                          "Deleted!",
                          "삭제가 완료되었습니다",
                          "success"
                        );
                      } else {
                        Swal.fire(
                          "",
                          "입고를 진행 중이거나 완료인 경우에는 삭제할 수 없습니다.",
                          "error"
                        );
                      }
                    });
                  }
                });
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <FormControl component="form" id="table">
          <TableContainer
            component={Paper}
            sx={{
              width: "94%",
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 300,
              // marginLeft: "40px",
            }}
            onScroll={handleWindowScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ height: 3 }}>
                  <TableCell
                    sx={{
                      width: "5%",
                      backgroundColor: "#F6F7F9",
                      p: 0,
                      textAlign: "center",
                    }}
                  >
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        masterAllCheckBox(e.currentTarget.checked);
                      }}
                      checked={
                        checkedRow.length !== 0 &&
                        checkedRow.every((row) => row.state === "t")
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "18%",
                      backgroundColor: "#F6F7F9",
                      fontWeight: "800",
                    }}
                  >
                    입고번호
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    입고일
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    담당자
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    거래처
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "10%",
                      backgroundColor: "#F6F7F9",
                      fontWeight: "800",
                    }}
                  >
                    진행상태
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "15%",
                      backgroundColor: "#F6F7F9",
                      p: 0,
                      fontWeight: "800",
                      textAlign: "center",
                    }}
                  >
                    비고
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: 2, p: 0 }}>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell sx={{ p: 0 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          format="YYYY-MM-DD"
                          slotProps={{
                            textField: { size: "small" },
                          }}
                          sx={{
                            paddingLeft: 2,
                            paddingRight: 5,
                            height: "34px",
                            "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-sizeSmall.MuiInputBase-adornedEnd":
                              {
                                height: "27px",
                              },
                          }}
                          onAccept={handleAccept}
                          value={inputMaster.date || null}
                        ></DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <Box
                      sx={{
                        p: 0,
                        border: "1px solid #C4C4C4",
                        height: "28px",
                        display: "flex",
                        width: "190px",
                        marginRight: "5px",
                        borderRadius: "4px",
                        paddingRight: "8px",
                      }}
                      onClick={() => {
                        toggleModal(openManager, "manager");
                      }}
                    >
                      <input
                        readOnly
                        type="text"
                        style={{
                          marginLeft: "10px",
                          width: "140px",
                          height: "27px",
                          border: 0,
                          font: "inherit",
                          cursor: "pointer",
                        }}
                        name="userName"
                        placeholder="담당자명"
                        value={inputMaster.userName}
                        onChange={onChangeHandler}
                      />
                      <SearchIcon
                        sx={{
                          marginLeft: "auto",
                          marginTop: "3px",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <Box
                      sx={{
                        p: 0,
                        border: "1px solid #C4C4C4",
                        height: "28px",
                        display: "flex",
                        width: "190px",
                        marginRight: "5px",
                        borderRadius: "4px",
                        paddingRight: "8px",
                      }}
                      onClick={() => {
                        toggleModal(openBusiness, "business");
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          marginLeft: "10px",
                          width: "140px",
                          height: "27px",
                          border: 0,
                          font: "inherit",
                          cursor: "pointer",
                        }}
                        name="businessName"
                        placeholder="거래처명"
                        value={inputMaster.businessName}
                        onChange={onChangeHandler}
                      />
                      <SearchIcon
                        sx={{
                          marginLeft: "auto",
                          marginTop: "3px",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading.current ? (
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
                ) : masters.length > 0 ? (
                  masters.map((master, index) => (
                    <MasterItem
                      key={index}
                      no={index}
                      code={master.code}
                      date={master.date}
                      username={master.userName}
                      businessname={master.businessName}
                      disable={master.disable}
                      exit={master.userExit}
                      receiveDetail={receiveDetail}
                      rowColor={rowColor}
                      state={master.state}
                      checkedRow={checkedRow}
                      setCheckedRow={setCheckedRow}
                      masterStateUpdate={masterStateUpdate}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                      등록된 입고리스트가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default ReceiveMaster;
