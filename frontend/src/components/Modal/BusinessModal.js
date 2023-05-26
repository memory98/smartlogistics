import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { customFetch } from '../custom/customFetch';

export default function BusinessModal({ open, onClose, handleButtonClick }) {
  const [business, setBusiness] = useState([]);
  const searchKw = useRef({ code: '', phone: '' });
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const isNotDataMore = useRef(false);
  const form = useRef();
  const loading = useRef(true);
  const [searchTextFiled, setSearchTextFiled] = useState({ code: '', phone: '' });

  useEffect(() => {
    const tablePro = document.getElementById('table');
    tablePro.addEventListener('scroll', handleWindowScroll);
    if (open === true) {
      isNotDataMore.current = false;
      searchKWDfetch();
    }
    return () => {
      tablePro.removeEventListener('scroll', handleWindowScroll);
    };
  }, [open]);

  const onCloseAndClear = () => {
    setBusiness([]);
    setSearchTextFiled({ code: '', phone: '' });
    startIndex.current = 0;
    searchKw.current = { code: '', phone: '' };
    onClose();
  };

  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      searchKWDfetch();
    }
  };

  const autoHyphen = (target) => {
    return target
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  };
  const onChangeHandler = (e) => {
    let { value, name } = e.target;

    if (name === 'phone') {
      if (value.length > 13) {
        return;
      }
      value = autoHyphen(value);
    }
    setSearchTextFiled((prev) => ({ ...prev, [name]: value }));
  };

  const searchKWDfetch = async () => {
    if (isFetching) {
      return;
    }
    if (isNotDataMore.current) {
      return;
    }
    const limit = 10;
    setIsFetching(true);
    await customFetch(`/api/business/search?offset=${startIndex.current}&limit=${limit}`, {
      method: 'post',
      body: JSON.stringify(searchKw.current),
    }).then((json) => {
      if (json.data.length === limit) {
        startIndex.current += limit;
      } else {
        isNotDataMore.current = true;
      }
      if (json.data !== null) {
        loading.current = false;
      }

      setBusiness((prev) => [...prev, ...json.data]);
      setIsFetching(false);
    });
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
            width: 900,
            height: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box
            variant="h6"
            sx={{
              fontSize: '28px',
              textAlign: 'center',
              mb: '20px',
            }}
          >
            거래처
          </Box>
          <Box>
            <FormControl
              ref={form}
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                startIndex.current = 0;
                searchKw.current = searchTextFiled;
                isNotDataMore.current = false;
                loading.current = true;
                setSearchTextFiled({ code: '', phone: '' });
                form.current.reset();
                setBusiness([]);
                searchKWDfetch();
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
                value={searchTextFiled.code || null}
                name="code"
                InputProps={{ sx: { height: 30, width: 150 } }}
              ></TextField>
              <label style={{ fontSize: '0.9rem' }}>전화번호</label>
              <TextField
                size="small"
                sx={{
                  paddingLeft: '15px',
                  paddingRight: '40px',
                }}
                onChange={onChangeHandler}
                value={searchTextFiled.phone || null}
                name="phone"
                InputProps={{ sx: { height: 30, width: 150 } }}
              ></TextField>
              <Button type="submit" variant="outlined" sx={{ marginRight: 'auto' }}>
                <SearchIcon />
              </Button>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '80px',
              borderBottom: '0.5px solid #e9e9e9',
            }}
          />
          <Box
            sx={{
              width: '800px',
              height: '221px',
              overflow: 'auto',
              inlineSize: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              border: '1px solid #D1D1D1',
            }}
            onScroll={handleWindowScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    순번
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    거래처코드
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    거래처명
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    전화번호
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>
                    선택
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
                  business.map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        ':hover': {
                          background: '#EFF8FF',
                          fontWeight: 600,
                        },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{data.code}</TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.phone}</TableCell>
                      <TableCell align="center">
                        <Button
                          sx={{ width: '100%', p: 0 }}
                          onClick={() => {
                            handleButtonClick('business', {
                              businessCode: data.code,
                              businessName: data.name,
                            });
                            onCloseAndClear();
                          }}
                        >
                          선택
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
