import React, { useState, useEffect } from "react";
import BetterInfiniteScroll from "./BetterInfiniteScroll";

const Elem = ({ i, style }) => {
  return (
    <div
      style={{
        ...style,
        backgroundColor: "#fff",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "150px",
        margin: "10px 0",
        height: "50px"
      }}
    >
      div-#{i}
    </div>
  );
};

const BetterExample = () => {
  const [items, setItems] = useState(() => Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      const nextItems = items.concat(Array.from({ length: 20 }));
      setItems(nextItems);
    }, 500);
  };

  useEffect(() => {
    if (items.length >= 100) {
      setHasMore(false);
    }
  }, [items.length]);

  const rowRenderer = ({ index, key, style }) => (
    <Elem key={key} i={index} style={style} />
  );

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <h3 style={{ textAlign: "center" }}>height가 적용된 컴포넌트</h3>
      <BetterInfiniteScroll
        dataLength={items.length}
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
        children={items}
      />
    </div>
  );
};

export default BetterExample;
