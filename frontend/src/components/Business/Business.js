import React, { useRef, useState } from "react";
import Search from "./Search";
import BusinessList from "./BusinessList";
import BusinessUpdate from "./BusinessUpdate";
import { Box, Grid } from "@mui/material";
import { customFetch } from "../custom/customFetch";
import Swal from 'sweetalert2';

const Business = () => {
  /** fetch, 즉 list를 출력하기 위한 state */
  const [businesses, setBusinesses] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [item, setItem] = useState({ code: "", name: "", phone: "" });
  const rowColor = useRef(); // 행 클릭 시 background 색상 변경 Ref

  const searchKw = useRef({ code: "", phone: "" });
  const isNotDataMore = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const submitError = useRef('');

  const [loading, setLoading] = useState(true);

  /** 들어오는 값이 빈 값이면 모든 리스트 출력 / 아니면 검색어에 대한 결과값 출력 */
  const textHandleChanges = (e) => {
    // console.log(e.target.elements[0].name);
    const _target = e.target.elements;
    console.log(_target[2].value);
    if(_target[0].value === "" && _target[1].value === "") {
      searchKeyword();
    }
    else {
      startIndex.current = 0;
      setBusinesses([]);
      setLoading(true);
      isNotDataMore.current = false;
      setIsFetching(false);
      search(e.target)
    }
  };
  const search = (_target) => {
    const datas = Array.from(_target, (input) => {
      return { n: input.name, v: input.value };
    })
      .filter(({ n }) => n !== "")
      .reduce((res, { n, v }) => {
        console.log(`res: ${res}, name: ${n}, value: ${v}`);
        res[n] = v;
        return res;
      }, {});
    searchKw.current = datas;
    startIndex.current = 0;
    isNotDataMore.current = false;
    setBusinesses([]);
    searchKeyword();
  };
  

  const searchKeyword = async () => {
    if (isFetching) {
      return;
    }
    const limit = 15;

    if (isNotDataMore.current) {
      return;
    }
    var url = `/api/business/search?offset=${startIndex.current}&limit=${limit}`;
    setIsFetching(true);
    await customFetch(url, {
      method: "post",
      body: JSON.stringify(searchKw.current),
    }).then((json) => {
      if (json.data.length === limit) {
        startIndex.current += limit;
      } else {
        isNotDataMore.current = true;
      }
      if (json.data !== null) {
        setLoading(false);
      }

      setBusinesses((prev) => [...prev, ...json.data]);
      setIsFetching(false);
    });
    setDetail([]);
    setItem({ code: "", name: "", phone: "" });
  };

  /** Update Handler */
  const itemUpdateHandler = async (item, target) => {
    await customFetch(`/api/business/update?bc=${target}`, {
      method: "post",
      body: JSON.stringify(item),
    }).then(() =>
      setBusinesses((prev) =>
        prev.map((business) => (business.code === target ? item : business))
      )
    );
    Swal.fire('', target + '의 정보 수정이 완료되었습니다.', 'success');
  };

  const businessDetail = async (code) => {
    setDetail(...businesses.filter((business) => business.code === code));
    rowColor.current = code;
  };

  /** 삭제 api */
  const deleteItemHandler = async (data) => {
    await customFetch(`/api/business/delete`, {
      method: "post",
      body: JSON.stringify(data),
    }).then((json) => {
      if(json.data === null) {
        submitError.current = '입출고 목록에서 사용하고 있는 데이터입니다.';
      }
      else {
        setBusinesses(businesses.filter((business) => json.data.indexOf(business.code) == -1));
        submitError.current = '';
      }
    });
  };


  return (
    <Box>
      <Grid container spacing={2} style={{ marginLeft: "0px" }}>
        <Search textHandleChanges={textHandleChanges} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <BusinessList
            businesses={businesses}
            setBusinesses={setBusinesses}
            businessDetail={businessDetail}
            setItem={setItem}
            searchKeyword={searchKeyword}
            deleteItemHandler={deleteItemHandler}
            loading={loading}
            rowColor={rowColor}
            setDetail={setDetail}
            submitError={submitError}
          />
          <BusinessUpdate
            businessDetail={Detail}
            itemUpdateHandler={itemUpdateHandler}
            item={item}
            setItem={setItem}
          />{" "}
        </Box>
      </Grid>
    </Box>
  );
};

export default Business;
