import React, { useRef, useState } from "react";
import Search from "./Search";
import BusinessList from "./BusinessList";
import BusinessUpdate from "./BusinessUpdate";
import { Box, Grid } from "@mui/material";
import { customFetch } from "../custom/customFetch";

const Business = () => {
  /** fetch, 즉 list를 출력하기 위한 state */
  const [businesses, setBusinesses] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [item, setItem] = useState({ code: "", name: "", phone: "" });
  const rowColor = useRef(); // 행 클릭 시 background 색상 변경 Ref

  /** 들어오는 값이 빈 값이면 모든 리스트 출력 / 아니면 검색어에 대한 결과값 출력 */
  const textHandleChanges = (e) => {
    // console.log(e.target.elements[0].name);
    const _target = e.target.elements;
    console.log(_target[2].value);
    _target[0].value === "" && _target[1].value === ""
      ? searchKeyword()
      : search(e.target);
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
  const searchKw = useRef({ code: "", phone: "" });
  const isNotDataMore = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);

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
      console.log(json.data);
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
    alert(target + " 거래처 정보 변경 완료");
  };

  const businessDetail = async (code) => {
    setDetail(...businesses.filter((business) => business.code === code));
    rowColor.current = code;
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
            loading={isFetching}
            rowColor={rowColor}
            setDetail={setDetail}
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
