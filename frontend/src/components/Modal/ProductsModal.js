import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { customFetch } from '../custom/customFetch';
const ProductsModal = ({ open, onClose, handleButtonClick, details, receiveAdd }) => {
  // 추가할 List
  const [selectList, setSelectList] = React.useState([]);
  // 삭제할 List
  const [deleteList, setDeleteList] = React.useState([]);
  // 추가되어 있는 List
  const [addList, setAddList] = React.useState([]);
  // productlist
  const [products, setProducts] = useState([]);

  const [searchTextFiled, setSearchTextFiled] = useState({ keywd: '', size: '' });
  const searchKw = useRef({ keywd: '', size: '' });

  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const isNotDataMore = useRef(false);
  const form = useRef();
  const loading = useRef(true);

  useEffect(() => {
    productSearch();

    setAddList(
      // detail 객체에서 productCode, productName, productSize, productUnit  정보만 가져옴.
      details.map(({ productCode, productName, productSize, productUnit }) => ({
        productCode,
        productName,
        productSize,
        productUnit,
      }))
    );
    return () => {
      details = null;
      setAddList([]);
      setDeleteList([]);
      setSelectList([]);
    };
  }, [open]);
  const onCloseAndClear = () => {
    details = null;
    setAddList([]);
    setDeleteList([]);
    setSelectList([]);
    onClose();
  };
  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      productSearch();
    }
  };

  // product 검색
  const productSearch = async () => {
    if (isFetching) {
      return;
    }
    if (isNotDataMore.current) {
      return;
    }
    const limit = 10;
    var url = `/api/product/list?pk=${searchKw.current.keywd}&ps=${searchKw.current.size}&o=${startIndex.current}&l=${limit}`;
    setIsFetching(true);
    await customFetch(url, { method: 'get' }).then((json) => {
      console.log(json.data);
      if (json.data.length === limit) {
        startIndex.current += limit;
      } else {
        isNotDataMore.current = true;
      }
      if (json.data !== null) {
        loading.current = false;
      }
      const updateData = json.data.map(({ code: productCode, name: productName, size: productSize, unit: productUnit }) => ({
        productCode,
        productName,
        productSize,
        productUnit,
      }));
      //console.log(updateData);
      setProducts((prev) => [...prev, ...updateData]);
      setIsFetching(false);
      // setProducts(updateData);
    });
  };

  // searchbox Handler
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchTextFiled((prev) => ({ ...prev, [name]: value }));
  };

  //selectList ,deleteList chkHandle
  const handleClick = (event, data, _list, _setList) => {
    let newSelected = [];
    const selectedIndex = _list.indexOf(data);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(_list, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(_list.slice(1));
    } else if (selectedIndex === _list.length - 1) {
      newSelected = newSelected.concat(_list.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(_list.slice(0, selectedIndex), _list.slice(selectedIndex + 1));
    }
    _setList(newSelected);
  };

  // all chk
  const handleSelectAllClick = (event, _totalList, _exceptionList, _setList) => {
    if (event.target.checked) {
      const newSelected = _totalList.filter((itemA) => !_exceptionList.find((itemB) => itemB.productCode === itemA.productCode));
      _setList(newSelected);
      return;
    }
    _setList([]);
  };

  // delete 아이콘 클릭 시
  const deleteProduct = () => {
    setSelectList(selectList.filter((itemA) => !deleteList.find((itemB) => itemB.productCode === itemA.productCode)));
    setAddList(addList.filter((itemA) => !deleteList.find((itemB) => itemB.productCode === itemA.productCode)));
    setDeleteList([]);
  };
  return (
    <Box>
      <Modal open={open} onClose={onCloseAndClear}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1200,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box>
            <Box
              variant="h6"
              sx={{
                fontSize: '28px',
                textAlign: 'center',
                width: '100%',
              }}
            >
              품목
            </Box>
          </Box>
          <Grid container sx={{ height: '40px', marginBottom: '15px' }}>
            <Grid
              item
              md={4}
              sx={{
                fontSize: '15px',
                marginTop: '15px',
              }}
            >
              <strong>품목리스트</strong>
            </Grid>
            <Grid item md={8} sx={{ marginBottom: '15px' }}>
              <FormControl
                ref={form}
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  startIndex.current = 0;
                  searchKw.current = searchTextFiled;
                  isNotDataMore.current = false;
                  loading.current = true;
                  setProducts([]);
                  setSearchTextFiled({ keywd: '', size: '' });
                  form.current.reset();
                  productSearch();
                }}
                sx={{
                  mt: 1,
                  display: 'flex',
                  float: 'right',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <label style={{ fontSize: '0.9rem' }}>검색어</label>
                <TextField
                  size="small"
                  sx={{
                    paddingLeft: '15px',
                    paddingRight: '40px',
                  }}
                  onChange={onChangeHandler}
                  name="keywd"
                  value={searchTextFiled.keywd || ''}
                  InputProps={{ sx: { height: 30, width: 150 } }}
                ></TextField>
                <label style={{ fontSize: '0.9rem' }}>규격</label>
                <TextField
                  size="small"
                  sx={{
                    paddingLeft: '15px',
                    paddingRight: '30px',
                  }}
                  onChange={onChangeHandler}
                  name="size"
                  value={searchTextFiled.size || ''}
                  InputProps={{ sx: { height: 30, width: 150 } }}
                ></TextField>
                <Button type="submit" variant="outlined" sx={{ marginRight: 'auto' }}>
                  <SearchIcon />
                </Button>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ border: '1px solid #D1D1D1' }}>
            <FormControl component="form" id="table" sx={{ width: '100%' }}>
              <TableContainer sx={{ height: 200 }} onScroll={handleWindowScroll}>
                <Table stickyHeader sx={{ width: '100%' }} aria-labelledby="tableTitle" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox" sx={{ backgroundColor: '#F6F7F9' }}>
                        <Checkbox
                          color="primary"
                          onChange={(event) => {
                            handleSelectAllClick(event, products, addList, setSelectList);
                          }}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                          checked={
                            loading.current === false &&
                            products.filter((item) => !addList.some((addItem) => addItem.productCode === item.productCode))
                              .length ===
                              selectList.filter((item) => !addList.some((addItem) => addItem.productCode === item.productCode))
                                .length
                          }
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ backgroundColor: '#F6F7F9' }}>
                        <strong>품번</strong>
                      </TableCell>
                      <TableCell align="center" sx={{ backgroundColor: '#F6F7F9' }}>
                        <strong>품명</strong>
                      </TableCell>
                      <TableCell align="center" sx={{ backgroundColor: '#F6F7F9' }}>
                        <strong>규격</strong>
                      </TableCell>
                      <TableCell align="center" sx={{ backgroundColor: '#F6F7F9' }}>
                        <strong>단위</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading.current ? (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      products.map((data, index) => {
                        const isItemSelected =
                          addList.map((item) => item.productCode).indexOf(data.productCode) !== -1 ||
                          selectList.map((item) => item.productCode).indexOf(data.productCode) !== -1;
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={data.productCode}
                            selected={isItemSelected}
                            sx={{
                              ':hover': isItemSelected
                                ? ''
                                : {
                                    background: '#EFF8FF',
                                    fontWeight: 600,
                                  },

                              backgroundColor: isItemSelected ? '#DCF1FF' : '#FFF',
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                disabled={addList.map((item) => item.productCode).indexOf(data.productCode) !== -1}
                                onClick={(event) => {
                                  handleClick(event, data, selectList, setSelectList);
                                }}
                                onChange={(e) => (e.target.checked = true)}
                                checked={isItemSelected === true}
                                color="primary"
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell align="center" size="small">
                              {data.productCode}
                            </TableCell>
                            <TableCell align="center" size="small">
                              {data.productName}
                            </TableCell>
                            <TableCell align="center" size="small">
                              {data.productSize}
                            </TableCell>
                            <TableCell align="center" size="small">
                              {data.productUnit}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                height: '36px',
                marginLeft: 'auto',
              }}
              onClick={() => {
                const filtered = selectList.filter(
                  (item) => !addList.some((addItem) => addItem.productCode === item.productCode)
                );
                setAddList([...addList, ...filtered]);
              }}
            >
              <strong>추가</strong>
            </Button>
          </Box>
          <Box
            sx={{
              mt: 10,
              width: '100%',
              height: '40px',
            }}
          >
            <Box
              variant="h6"
              sx={{
                fontSize: '15px',
                mt: 1,
                float: 'left',
              }}
            >
              <strong>추기리스트</strong>
            </Box>
            <Button
              sx={{
                float: 'right',
              }}
            >
              <DeleteIcon sx={{ color: 'black' }} onClick={deleteProduct} />
            </Button>
          </Box>
          <Box sx={{ border: '1px solid #D1D1D1', marginTop: '5PX' }}>
            <TableContainer sx={{ height: 200 }}>
              <Table sx={{ width: '100%' }} aria-labelledby="tableTitle" size="small">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: '#F6F7F9',
                      p: 0,
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onChange={(event) => {
                          handleSelectAllClick(event, addList, details, setDeleteList);
                        }}
                        inputProps={{
                          'aria-label': 'select all desserts',
                        }}
                        checked={
                          addList.filter((item) => !details.some((addItem) => addItem.productCode === item.productCode))
                            .length === deleteList.length && deleteList.length > 0
                        }
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addList && addList.length > 0 ? (
                    addList.map((data, index) => {
                      const isItemSelected = deleteList.map((item) => item.productCode).indexOf(data.productCode) !== -1;
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={data.productCode}
                          selected={isItemSelected}
                          sx={{
                            ':hover':
                              details.map((item) => item.productCode).indexOf(data.productCode) !== -1
                                ? ''
                                : {
                                    background: '#EFF8FF',
                                    fontWeight: 600,
                                  },

                            backgroundColor:
                              details.map((item) => item.productCode).indexOf(data.productCode) !== -1 ? '#DCF1FF' : '#FFF',
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              disabled={details.map((item) => item.productCode).indexOf(data.productCode) !== -1}
                              onClick={(event) => handleClick(event, data, deleteList, setDeleteList)}
                              onChange={(e) => (e.target.checked = true)}
                              checked={isItemSelected}
                              color="primary"
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center" size="small">
                            {data.productCode}
                          </TableCell>
                          <TableCell align="center" size="small">
                            {data.productName}
                          </TableCell>
                          <TableCell align="center" size="small">
                            {data.productSize}
                          </TableCell>
                          <TableCell align="center" size="small">
                            {data.productUnit}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                        등록된 품목이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                height: '36px',
                marginLeft: 'auto',
              }}
              onClick={() => {
                receiveAdd(addList.filter((itemA) => !details.find((itemB) => itemB.productCode === itemA.productCode)));
                handleButtonClick('product', null);
                onCloseAndClear();
              }}
            >
              <strong>등록</strong>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductsModal;
