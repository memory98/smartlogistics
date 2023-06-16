import React, { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import ProductUpdate from './ProductUpdate';
import { Box, Grid } from '@mui/material';
import { customFetch } from '../custom/customFetch';
import Swal from 'sweetalert2';

const Product = () => {
  // productlist
  const [products, setProducts] = useState([]);
  // productdetail
  const [Detail, setDetail] = useState([]);
  const [searchEvent, setSearchEvent] = useState(false);
  const [item, setItem] = useState({ code: '', name: '', size: '', unit: '' });
  const rowColor = useRef();
  const [codeChk, setCodeChk] = useState();
  const [loading, setLoading] = useState(true);

  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const isNotDataMore = useRef(false);
  const form = useRef();
  const searchKw = useRef({ pkeywd: '', psize: '' });

  const submitError = useRef('');
  // const loading = useRef(true);

  useEffect(() => {
    productSearch();
  }, []);

  // product 검색
  const productSearch = async (state) => {
    if (state === 'search') {
      startIndex.current = 0;
      setProducts([]);
      setLoading(true);
      isNotDataMore.current = false;
      setIsFetching(false);
    }
    if (isFetching) {
      return;
    }
    if (isNotDataMore.current) {
      return;
    }
    const limit = 15;
    var url = `/api/product/list?pk=${searchKw.current.pkeywd}&ps=${searchKw.current.psize}&o=${startIndex.current}&l=${limit}`;
    setIsFetching(true);
    await customFetch(url, { method: 'get' }).then((json) => {
      if (json.data.length === limit) {
        startIndex.current += limit;
      } else {
        isNotDataMore.current = true;
      }
      if (json.data !== null) {
        setLoading(false);
      }
      setProducts((prev) => [...prev, ...json.data]);
      setIsFetching(false);
    });
    setSearchEvent((prev) => !prev);
    setDetail([]);
  };

  // product 추가
  const itemAddHandler = async (item) => {
    if (item != null) {
      await customFetch('/api/product/data', {
        method: 'post',
        body: JSON.stringify(item),
      }).then((json) => {
        if (json.data.state === 'true') {
          setProducts((prev) => [...prev, json.data.vo]);
          setCodeChk(true);
          Swal.fire('', '품목이 추가되었습니다.', 'success');
          setSearchEvent((prev) => !prev);
          setDetail([]);
          rowColor.current = '';
        } else {
          setCodeChk(false);

          if (json.data.vo.state === '1') {
            Swal.fire('', '이미 등록되어 있는 데이터 입니다.', 'warning');
          } else if (json.data.vo.state === '0') {
            Swal.fire('', '삭제된 데이터 품번과 동일합니다.', 'warning');
          }
          //if(json.data.vo.state)
        }
      });
    }
  };

  //product 수정
  const itemUpdateHandler = async (item, target) => {
    // item: 객체 형태로 update form에 이쓴ㄴ 데이터들 / target: 품목 코드
    await customFetch(`/api/product/update?pc=${target}`, {
      method: 'post',
      body: JSON.stringify(item),
    }).then(() => productSearch('search'));
    setSearchEvent((prev) => !prev);
    Swal.fire('', target + '의 정보 수정이 완료되었습니다.', 'success');
  };

  // product 세부사항
  const productDetail = async (code) => {
    await customFetch(`/api/product/detail?pc=${code}`, { method: 'get' }).then((json) => {
      setDetail(json.data);
      rowColor.current = code;
      setCodeChk(true);
    });
    setSearchEvent((prev) => !prev);
  };

  // product 삭제
  const deleteItemHandler = async (data) => {
    await customFetch(`/api/product/delete`, {
      method: 'post',
      body: JSON.stringify(data),
    }).then((json) => {
      if (json.data === null) {
        submitError.current = '입출고 목록에서 사용하고 있는 데이터입니다.';
      } else {
        setProducts(products.filter((product) => json.data.indexOf(product.code) == -1));
        submitError.current = '';
      }
    });
    setSearchEvent((prev) => !prev);
  };

  return (
    <Box>
      <Grid container spacing={2} style={{ marginLeft: '0px' }}>
        <SearchBar callback={productSearch} searchKw={searchKw} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
          }}
        >
          <ProductList
            products={products}
            productDetail={productDetail}
            itemAddHandler={itemAddHandler}
            deleteItemHandler={deleteItemHandler}
            setItem={setItem}
            rowColor={rowColor}
            codeChk={codeChk}
            searchEvent={searchEvent}
            loading={loading}
            productSearch={productSearch}
            submitError={submitError}
          />
          <ProductUpdate productDetail={Detail} itemUpdateHandler={itemUpdateHandler} item={item} setItem={setItem} />
        </Box>
      </Grid>
    </Box>
  );
};

export default Product;
