import React, { useRef, useState, useEffect } from "react";
import BusinessItem from "./BusinessItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from 'sweetalert2';
import {
  TextField,
  Box,
  FormControl,
  Checkbox,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { customFetch } from "../custom/customFetch";
import SelectedDataDeleteModal from "../Modal/SelectedDataDeleteModal";

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 38.5px;
    padding: 4px;
  }
`;

/** 조건에 맞는 리스트 주르륵 출력 */
function BusinessList({
  businesses,
  setBusinesses,
  businessDetail,
  setItem,
  searchKeyword,
  deleteItemHandler,
  loading,
  rowColor,
  setDetail,
  submitError,
}) {
  // const [newDatas, setNewDats] = useState({code: '', name:'', phone:''});
  /** fetch, 즉 list를 출력하기 위한 state */
  const refForm = useRef(null);
  /** Delete를 위한 체크박스 State */
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [codeChk, setCodeChk] = useState();
  /**  submit하기위한 check여부 */
  const isCheck = useRef(true);
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.length > 13) {
      return;
    }
    setPhone(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };

  /** form 데이터를 관리하기 위한 state */
  const [data, setData] = useState({});
  // =================================== DELETE =======================================
  /** delete 체크박스 Handler  */
  const changeHandler = (checked, code) => {
    checked
      ? setCheckedButtons([...checkedButtons, code])
      : setCheckedButtons(checkedButtons.filter((el) => el !== code));
      // 클릭된 'code'랑 같으면 제거해서 새로운 배열을 만듬
    if (isChecked) {
      setIsChecked(false);
    }
    if (checked) {
      if (!isChecked) {
        businesses.length === checkedButtons.length + 1
          ? setIsChecked((prev) => !prev)
          : null;
      }
    }
  };

  /** 모두 선택해주는 체크박스 */
  const allCheckBox = (e) => {
    if (!isChecked) {
      // e.currentTarget.checked
      setIsChecked(e.target.checked);
      // checkedButtons에 business의 모든 code 값 넣기
      const data = businesses.map((el) => el.code);
      console.log(data);
      setCheckedButtons(data);
    } else {
      setIsChecked(e.target.checked);
      setCheckedButtons([]);
    }
  };

  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      searchKeyword();
    }
  };

  useEffect(() => {
    const tablePro = document.getElementById("table");
    tablePro.addEventListener("scroll", handleWindowScroll);
    searchKeyword();
    return () => {
      tablePro.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  // =================================== ADD =======================================
  /** 데이터를 리스트에 추가하는 Handler */
  const addItemHandler = async function (data) {
    await customFetch("/api/business/add", {
      method: "post",
      body: JSON.stringify(data),
    }).then((json) => {
      console.log(json.data.state);
      if (json.data.state === "true") {
        setBusinesses((prev) => [...prev, json.data.vo]);
        setCodeChk(true);
        refForm.current.reset();
        setPhone("");
        Swal.fire('', '거래처가 추가되었습니다.', 'success');
        setDetail([]);
      } else {
        setCodeChk(false);
        console.log(json.data.vo.state);
        if (json.data.vo.state === "1") {
          Swal.fire('', '이미 등록되어 있는 데이터 입니다.', 'warning');
        } else if (json.data.vo.state === "0") {
          Swal.fire('', '삭제된 데이터 코드와 동일합니다.', 'warning');
        }
      }
    });
  };

  /** form 데이터 변환 */
  function handleSubmit(e) {
    e.preventDefault();

    const data = Array.from(refForm.current.elements, (input) => {
      return { n: input.name, v: input.value };
    })
      .filter(({ n }) => n !== "")
      .reduce((res, { n, v }) => {
        
        if (v === "") {
          if (isCheck.current) {
            isCheck.current = false;
            document.getElementById(n).focus();
          }
        }
        if(n === "name" && v.length > 20) {
          if (isCheck.current) {
            isCheck.current = false;
            Swal.fire({
              icon: 'warning',                         // Alert 타입
              title: '글자 수 제한',         // Alert 제목
              text: '거래처명은 20자 이내로 입력해주세요.',  // Alert 내용
              width: '500px', // 너비 수정, 기본값이 500인듯
              customClass: {
                
              }
            }).then(() => {
              document.getElementById(n).focus(); // 포커스 이동
            });
            document.getElementById(n).value = "";
          }
        }
        res[n] = v;
        return res;
      }, {});

    setData(data);
    if (isCheck.current) {
      addItemHandler(data);
      if (!codeChk) {
        document.getElementById("code").focus();
      }
    }
    isCheck.current = true;
  }

  /** 마지막행에서 Enter 누르면 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  // ================================================================================
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    setItem({ code: "", name: "", phone: "" });
  };

  //삭제 모달 관련
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setItem({ code: "", name: "", phone: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalMessage = () => {
    const length = checkedButtons.length;
    if (isChecked) {
      return "거래처 전체를 삭제하시겠습니까?";
    }
    if (length === 0) {
      return 0;
    }
    if (length === 1) {
      console.log(checkedButtons);
      return checkedButtons[0] + "을 삭제하시겠습니까?";
    }
    return length + "개의 거래처를 삭제하시겠습니까?";
  };

  const onDeleteButton = async () => {
    await deleteItemHandler(checkedButtons);
    setItem({ code: '', name: '', phone: '' });

    return submitError.current;
  };

  const swal = (icon, title, text) => {
    Swal.fire({
      icon: icon,                         // Alert 타입
      title: title,         // Alert 제목
      text: text,  // Alert 내용
      width: '500px', // 너비 수정, 기본값이 500인듯
    })
  }
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ width: "97%", display: "flex" }}>
          <DeleteIcon
            sx={{ padding: "7px", cursor: "pointer", marginLeft: "auto" }}
            onClick={() => {
              modalMessage() === 0 ? Swal.fire('', '체크된 데이터가 존재하지 않습니다.', 'warning') 
              : Swal.fire({
                text: modalMessage(), // modalMessage()
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '삭제',
              }).then((result) => {
                  if (result.isConfirmed) {
                    const returnData = onDeleteButton();
                    
                    returnData.then(result => {
                      if(result === "") {
                        Swal.fire('Deleted!', '삭제가 완료되었습니다', 'success');
                        setCheckedButtons([]);
                        setIsChecked(false);
                      }
                      else {
                        Swal.fire('', '입출고에서 사용되고 있는 데이터입니다.', 'error');
                      }
                    });  
                  }
              })}}
          />
        </Box>
        <FormControl
          id="table"
          component="form"
          onSubmit={handleSubmit}
          ref={refForm}
        >
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
                      textAlign: "center",
                      p: 0,
                    }}
                  >
                    <Checkbox
                      align="center"
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
                    순번
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    거래처 코드
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    거래처명
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#F6F7F9", fontWeight: "800" }}
                  >
                    연락처
                  </TableCell>
                </TableRow>

                <TableRow sx={{ height: 2, p: 0 }}>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="code"
                      name="code"
                      type="text"
                      placeholder="코드"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={
                        (data && data.code === "") ||
                        (!codeChk && codeChk != null)
                          ? true
                          : false
                      }
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="name"
                      name="name"
                      type="text"
                      placeholder="이름"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.name === "" ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="전화번호"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.phone === "" ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                      value={phone}
                      onChange={handlePhoneChange}
                    ></TextField>
                  </TableStickyTypeCell>
                </TableRow>
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
                ) : businesses.length > 0 ? (
                  businesses.map((item, index) => (
                    <BusinessItem
                      key={`business_item_${item.code}`}
                      no={index}
                      code={item.code}
                      name={item.name}
                      phone={item.phone}
                      businessDetail={businessDetail}
                      checkedButtons={checkedButtons}
                      changeHandler={changeHandler}
                      handleCheckboxClick={handleCheckboxClick}
                      rowColor={rowColor}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                      등록된 거래처가 없습니다.
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
}

export default BusinessList;
