import React, { useEffect, useRef, useState } from 'react';
import AutoScrollTable from '../Table/AutoScrollTable';
import AutoScrollTable2 from '../Table/AutoScrollTable2';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { Box, TableCell, TableHead, TableRow } from '@mui/material';

const StockTable2 = ({ list, setList, searchKw, searchKeyword }) => {
  // const Width = ['120px', '140px', '120px', '120px', '120px', '120px', '120px', '100px', '100px', '80px', '80px', '100px'];
  const [items, setItems] = useState(list);
  const [hasMore, setHasMore] = useState(true);
  const startIndex = useRef(0);
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    // setTimeout(() => {
    //   const nextItems = items.concat(Array.from({ length: 20 }));
    //   setItems(nextItems);
    // }, 500);
      // const nextItems = list.concat();
      console.log('startIndex.current',startIndex.current);
      console.log(list);
      searchKeyword(searchKw,startIndex.current,0);
      const NextItems = items.concat(list);
      setList(NextItems);
      setItems(NextItems);
      
      console.log(NextItems)
    startIndex.current +=10;
  };


  useEffect(() => {
    if (list.length >= 100) {
      setHasMore(false);
    }
  }, [list.length]);

  const rowRenderer = ({ index, key, style }) => {
    const item = list[index];

    const styled ={
      width: '100px',
      left: style.left,
      top: style.top,
      position: 'static',
    };

    console.log(style);
    return (
      <TableRow 
        key={key} 
        sx={{
          backgroundColor: item.state==='RV' ? 'rgba(255, 99, 132, 0.1)':'rgba(54, 162, 235, 0.1)',
        }}>
        {/*스타일 넣어줘야 virtual render 적용됨*/}
        <TableCell sx={styled}>
          {item.date}
        </TableCell>
        <TableCell sx={styled}>
          {item.code}
        </TableCell>
        <TableCell sx={styled}>
          {item.userName}
        </TableCell>
        <TableCell sx={styled}>
          {item.businessName.length > 5 ? item.businessName.substr(0, 5) + '...' : item.businessName}
        </TableCell>
        <TableCell sx={styled}>
          {item.productCode}
        </TableCell>
        <TableCell sx={styled}>
          {item.productName.length > 5 ? item.productName.substr(0, 5) + '...' : item.productName}
        </TableCell>
        <TableCell sx={styled}>
          {item.size}
        </TableCell>
        <TableCell sx={styled}>
          {item.unit}
        </TableCell>
        <TableCell sx={styled}>
          {item.beginningStock}
        </TableCell>
        {
          item.state === 'RV' ?
            <>
        <TableCell sx={styled}>
                {item.count}
              </TableCell>
              <TableCell sx={styled}>
              </TableCell>
            </> :
            <>
        <TableCell sx={styled}>
              </TableCell>
              <TableCell sx={styled}>
                {item.count}
              </TableCell>
            </>
        }
        <TableCell sx={styled}>
          {item.endingStock}
        </TableCell>
      </TableRow>
    );
  };

  const tableHeadStyle = {
    backgroundColor: "#F6F7F9", fontWeight: 800
  }
  return (
    <AutoScrollTable2
      list={list}
      hasMore={hasMore}
      next={fetchMoreData}
      loader={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          loading...
        </div>
      }
      height={400}
      elementHeight={70} // 새로 추가
      rowRenderer={rowRenderer}
      >
      <TableHead sx={tableHeadStyle}>
        <TableRow>
          <TableCell>
            입출고일
          </TableCell>
          <TableCell>
            코드
          </TableCell>
          <TableCell>
            담당자
          </TableCell>
          <TableCell>
            거래처
          </TableCell>
          <TableCell>
            품번
          </TableCell>
          <TableCell>
            품명
          </TableCell>
          <TableCell>
            규격
          </TableCell>
          <TableCell>
            단위
          </TableCell>
          <TableCell>
            기초재고
          </TableCell>
          <TableCell>
            입고
          </TableCell>
          <TableCell>
            출고
          </TableCell>
          <TableCell>
            기말재고
          </TableCell>
        </TableRow>
      </TableHead>
    </AutoScrollTable2>
  );
};
export default StockTable2;
