import React, { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import List from './List';
import Graph from './Graph';
import { customFetch } from '../custom/customFetch';
import { format } from 'date-fns';
import dayjs from 'dayjs';

const Inquiry = () => {
  const [state, setState] = useState(true);
  const [list, setList] = useState([]);
  const searchKw = useRef({ user_name: '', business_name: '', code: '', startdt: '', enddt: '', st:'ALL' });
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const scrollend = useRef(false);
  const loading = useRef(true);

  const searchKeyword = async (_state) => {
    console.log('searchKw.current',searchKw.current)
    console.log('state',_state)
    if (_state === 'search') {
      startIndex.current = 0;
      setList([]);
      loading.current = true;
      scrollend.current = false;
      setIsFetching(false);
    }

    if (isFetching) {
      return;
    }

    if (scrollend.current === true) {
      return;
    }

    let startdt = '';
    let enddt = '';

    if (searchKw.current && searchKw.current.startdt === '' && searchKw.current.enddt !== '') {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(searchKw.current.enddt.$d, 'yyyy-MM-dd');
    } else if (searchKw.current && searchKw.current.enddt === '' && searchKw.current.startdt !== '') {
      startdt = format(searchKw.current.startdt.$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    } else if (searchKw.current && searchKw.current.startdt !== ''&&searchKw.current.startdt && searchKw.current.enddt !== '') {
      startdt = format(searchKw.current.startdt.$d, 'yyyy-MM-dd');
      enddt = format(searchKw.current.enddt.$d, 'yyyy-MM-dd');
    } else if ((searchKw.current != null && searchKw.current.startdt === '' && searchKw.current.enddt === '') || searchKw.current === null) {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    }else{
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    }

    setIsFetching(true);
    const limit = 20;
    var url = `/api/inquiry/list?offset=${startIndex.current}&limit=${limit}&st=${searchKw.current.st}`;
    if (searchKw) {
      url = `/api/inquiry/list?offset=${startIndex.current}&limit=${limit}&sdt=${startdt}&edt=${enddt}&st=${searchKw.current.st}&user_name=${searchKw.current.user_name}&business_name=${searchKw.current.business_name}&code=${searchKw.current.code}`;
    }
    console.log('url',url)
    await customFetch(url, {
      method: "get",
    }).then((json) => {
      setList(pre => [...pre, ...json.data]);

      if (json.data !== null) {
        loading.current = false;
      }

      if (json.data.length === 0) {
        
        scrollend.current = true;
      }
    }).finally(() => {
      startIndex.current += 20;
      setIsFetching(false);
      console.log('list', list);
    });
  }

  return (
    <Box>
      <Grid container sx={{ width: '101%', marginLeft: "0px" }}>
        <SearchBar
          state={state}
          setState={setState}
          searchKeyword={searchKeyword}
          searchKw={searchKw}
        />
        {
          state
            ?
            <List
              list={list}
              setList={setList}
              searchKw={searchKw}
              searchKeyword={searchKeyword}
              loading={loading}
            />
            :
            <Graph />
        }
      </Grid>
    </Box>
  );
};

export default Inquiry;