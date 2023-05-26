import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { customFetch } from "../custom/customFetch";
const Modal2 = ({ open, onClose }) => {
  const DEFAULT_ROWS_PER_PAGE = 5;
  // productList chk
  const [selected1, setSelected1] = React.useState([]);
  // selectList chk
  const [selected2, setSelected2] = React.useState([]);
  // 추가 버튼 누를 시 selectList에 추가되는 List
  const [selectList, setSelectList] = React.useState([]);
  // const [visibleRows, setVisibleRows] = React.useState(null);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [page, setPage] = React.useState(0);
  // productList chkbox selected
  const isSelected1 = (data) => selected1.indexOf(data) !== -1;
  // selectList chkbox selected
  const isSelected2 = (name) => selected2.indexOf(name) !== -1;
  // productlist
  const [products, setProducts] = useState([]);
  const [searchKWD, setSearchKWD] = useState({ keywd: "", size: "" });

  useEffect(() => {
    productSearch(null);
    return () => {
      setSelected1([]);
      setSelected2([]);
      setSelectList([]);
    };
  }, []);

  // product 검색
  const productSearch = async () => {
    var url = `/api/product/list?pk=${searchKWD.keywd}&ps=${searchKWD.size}`;
    await customFetch(url, { method: "get" }).then((json) =>
      setProducts(json.data)
    );
  };
  // searchbox Handler
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKWD((prev) => ({ ...prev, [name]: value }));
  };

  //productlist chkHandle
  const handleClick1 = (event, data) => {
    let newSelected = [];
    const selectedIndex = selected1.indexOf(data);
    console.log(`selectedIndex${selectedIndex}`);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected1, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected1.slice(1));
    } else if (selectedIndex === selected1.length - 1) {
      newSelected = newSelected.concat(selected1.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected1.slice(0, selectedIndex),
        selected1.slice(selectedIndex + 1)
      );
    }
    console.log(`handleClick1${newSelected}`);
    setSelected1(newSelected);
  };
  //selectList chkHandle
  const handleClick2 = (event, code) => {
    let newSelected = [];
    const selectedIndex = selected2.indexOf(code);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected2, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected2.slice(1));
    } else if (selectedIndex === selected2.length - 1) {
      newSelected = newSelected.concat(selected2.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected2.slice(0, selectedIndex),
        selected2.slice(selectedIndex + 1)
      );
    }

    setSelected2(newSelected);
  };
  // productList all chk
  const handleSelectAllClick1 = (event) => {
    console.log(`event${event}`);
    if (event.target.checked) {
      console.log(event.target);
      const newSelected = products.map((n) => n.code);
      //setSelected1((prev) => ({ ...prev, [name]: value }));
      setSelected1(newSelected);
      return;
    }
    setSelected1([]);
  };
  // selectList all chk
  const handleSelectAllClick2 = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.code);
      setSelected2(newSelected);
      return;
    }
    setSelected2([]);
  };

  return (
    <Box>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1200,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box>
            <Box
              variant="h6"
              sx={{
                fontSize: "28px",
                textAlign: "center",
                width: "100%",
              }}
            >
              품목
            </Box>
          </Box>
          <Grid container sx={{ height: "40px" }}>
            <Grid
              item
              md={4}
              sx={{
                fontSize: "15px",
                mt: 1,
                marginTop: "15px",
              }}
            >
              <strong>품목리스트</strong>
            </Grid>
            <Grid item md={8} sx={{ marginBottom: "15px" }}>
              <FormControl
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  productSearch();
                }}
                sx={{
                  mt: 1,
                  display: "flex",
                  float: "right",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label sx={{ fontSize: "0.5rem" }}>검색어</label>
                <TextField
                  size="small"
                  sx={{
                    paddingLeft: "15px",
                    paddingRight: "40px",
                  }}
                  onChange={onChangeHandler}
                  name="keywd"
                  InputProps={{ sx: { height: 30, width: 150 } }}
                ></TextField>
                <label sx={{ fontSize: "0.5rem" }}>규격</label>
                <TextField
                  size="small"
                  sx={{
                    paddingLeft: "15px",
                    paddingRight: "30px",
                  }}
                  onChange={onChangeHandler}
                  name="size"
                  InputProps={{ sx: { height: 30, width: 150 } }}
                ></TextField>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ marginRight: "auto" }}
                >
                  <SearchIcon />
                </Button>
              </FormControl>
            </Grid>
          </Grid>

          <TableContainer sx={{ mt: 1, height: 200 }}>
            <Table
              sx={{ width: "100%" }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F6F7F9",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={handleSelectAllClick1}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <strong>품번</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>품명</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>규격</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>단위</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>선택</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((data, index) => {
                  const isItemSelected = isSelected1(data);
                  console.log(`selectList${selectList}`);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick1(event, data.code, data)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={data.code}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          disabled={
                            selectList.indexOf(data) !== -1 ? true : false
                          }
                          onClick={(event) => {
                            handleClick1(event, data.code, data);
                          }}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" size="small">
                        {data.code}
                      </TableCell>
                      <TableCell align="center" size="small">
                        {data.name}
                      </TableCell>
                      <TableCell align="center" size="small">
                        {data.size}
                      </TableCell>
                      <TableCell align="center" size="small">
                        {data.unit}
                      </TableCell>
                      <TableCell align="center" size="small">
                        <Box
                          sx={{
                            cursor: "pointer",
                            zIndex: 999,
                          }}
                          //onClick={() => console.log("click")}
                        >
                          추가
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            sx={{
              mt: 2,
              color: "#41719C",
              border: "2px solid #41719C",
              borderRadius: "5px",
              float: "right",
              ":hover": {
                color: "#fff",
                backgroundColor: "#41719C",
              },
              height: "36px",
            }}
            onClick={() => {
              setSelectList(selected1);
            }}
          >
            <strong>추가</strong>
          </Button>
          <Box
            sx={{
              mt: 10,
              width: "100%",
              height: "40px",
            }}
          >
            <Box
              variant="h6"
              sx={{
                fontSize: "15px",
                mt: 1,
                float: "left",
              }}
            >
              <strong>리스트</strong>
            </Box>
            <Button
              sx={{
                float: "right",
              }}
            >
              <DeleteIcon sx={{ color: "black" }} />
            </Button>
          </Box>

          <TableContainer sx={{ height: 200 }}>
            <Table
              sx={{ width: "100%" }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F6F7F9",
                    p: 0,
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={handleSelectAllClick2}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <strong>품번</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>품명</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>규격</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>단위</strong>
                  </TableCell>
                  {/* <TableCell align="center">
                    <strong>수량</strong>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectList.length > 0 ? (
                  selectList.map((data, index) => {
                    const isItemSelected = isSelected2(data.code);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick2(event, data.code)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={data.code}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick2(event, data.code)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" size="small">
                          {data.code}
                        </TableCell>
                        <TableCell align="center" size="small">
                          {data.name}
                        </TableCell>
                        <TableCell align="center" size="small">
                          {data.size}
                        </TableCell>
                        <TableCell align="center" size="small">
                          {data.unit}
                        </TableCell>
                        {/* <TableCell align="center" size="small">
                          10
                        </TableCell> */}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                      등록된 품목이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data1.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <Button
            sx={{
              mt: 2,
              color: "#41719C",
              border: "2px solid #41719C",
              borderRadius: "5px",
              float: "right",
              ":hover": {
                color: "#fff",
                backgroundColor: "#41719C",
              },
              height: "36px",
            }}
            onClick={() => {}}
          >
            <strong>등록</strong>
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Modal2;
