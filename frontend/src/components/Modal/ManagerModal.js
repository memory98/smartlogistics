import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
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
import { customFetch } from '../custom/customFetch';

const ManagerModal = ({ open, onClose, handleButtonClick }) => {
  const [person, setPerson] = useState([]);
  const [searchTextFiled, setSearchTextFiled] = useState({ keywd: '', phone: '' });
  const searchKw = useRef({ keywd: '', phone: '' });

  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const isNotDataMore = useRef(false);
  const form = useRef();
  const loading = useRef(true);

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
  const autoHyphen = (target) => {
    return target
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  };
  const onCloseAndClear = () => {
    console.log('close');
    setPerson([]);
    setSearchTextFiled({ keywd: '', phone: '' });
    startIndex.current = 0;
    searchKw.current = { keywd: '', phone: '' };
    onClose();
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
  const handleWindowScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (clientHeight + scrollTop + 10 > scrollHeight) {
      searchKWDfetch();
    }
  };

  const searchKWDfetch = async () => {
    if (isFetching) {
      return;
    }
    if (isNotDataMore.current) {
      return;
    }
    const limit = 10;
    var url = `/api/user/modallist?uk=${searchKw.current.keywd}&up=${searchKw.current.phone}&offset=${startIndex.current}&limit=${limit}`;
    setIsFetching(true);
    await customFetch(url, { method: 'get' }).then((json) => {
      if (json.data.length === limit) {
        startIndex.current += limit;
      } else {
        isNotDataMore.current = true;
      }
      if (json.data !== null) {
        loading.current = false;
      }
      setPerson((prev) => [...prev, ...json.data]);
      setIsFetching(false);
      // setPerson(json.data);
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
            담당자
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
                setPerson([]);
                setSearchTextFiled({ keywd: '', phone: '' });
                form.current.reset();
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
              <label style={{ fontSize: '0.9rem' }}>이름</label>
              <TextField
                size="small"
                sx={{
                  paddingLeft: '15px',
                  paddingRight: '40px',
                }}
                onChange={onChangeHandler}
                value={searchTextFiled.keywd || null}
                name="keywd"
                InputProps={{ sx: { height: 30, width: 150 } }}
              ></TextField>
              <label style={{ fontSize: '0.9rem' }}>전화번호</label>
              <TextField
                size="small"
                sx={{
                  paddingLeft: '15px',
                  paddingRight: '30px',
                }}
                onChange={onChangeHandler}
                name="phone"
                InputProps={{ sx: { height: 30, width: 150 } }}
                value={searchTextFiled.phone || null}
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
          >
            <FormControl component="form" id="table">
              <TableContainer
                onScroll={handleWindowScroll}
                sx={{
                  width: '900px',
                  height: '221px',
                }}
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }} align="center">
                        순번
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }} align="center">
                        아이디
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }} align="center">
                        이름
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }} align="center">
                        전화번호
                      </TableCell>
                      <TableCell sx={{ width: '10%', backgroundColor: '#F6F7F9', fontWeight: '800' }} align="center">
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
                      person.map((data, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            height: 2,
                            p: 0,
                            ':hover': {
                              background: '#EFF8FF',
                              fontWeight: 600,
                            },
                          }}
                        >
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{data.id}</TableCell>
                          <TableCell align="center">{data.name}</TableCell>
                          <TableCell align="center">{data.phone}</TableCell>
                          <TableCell align="center">
                            <Button
                              sx={{ width: '100%', p: 0 }}
                              onClick={() => {
                                handleButtonClick('manager', {
                                  userId: data.id,
                                  userName: data.name,
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
              </TableContainer>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManagerModal;
