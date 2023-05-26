import React, { useEffect, useRef, useState } from 'react';
import {
  CellMeasurerCache,
  CellMeasurer,
  InfiniteLoader,
  List,
  AutoSizer,
} from "react-virtualized";
import throttle from "lodash/throttle";
import { Box, Table, TableBody, TableHead } from '@mui/material';
const AutoScollTable2 = ({
  list,
  next,
  hasMore,
  onScroll,
  height,
  loader,
  elementHeight,
  rowRenderer,
  children,
  comp }) => {
  const [showLoader, setShowLoader] = useState(false);
  let triggered = useRef(false);

  useEffect(() => {
    triggered.current = false;
    setShowLoader(false);
  }, [list.length]);

  const props = useRef({
    next,
    hasMore,
    onScroll
  });

  const scrollListener = e => {
    const { next, hasMore, onScroll } = props.current;
    if (typeof onScroll === "function") {
      setTimeout(() => onScroll && onScroll(e), 0);
    }

    const { clientHeight, scrollHeight, scrollTop } = e;

    if (triggered.current) {
      return;
    }

    const atBottom = scrollTop + clientHeight >= scrollHeight;

    if (atBottom && hasMore) {
      triggered.current = true;
      setShowLoader(true);
      next && next();
    }
  };

  useEffect(() => {
    props.current = {
      next,
      hasMore,
      onScroll
    };
  }, [next, hasMore, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  const isLoaderVisible = showLoader && hasMore;
  return (
    <Table>
      {
        children
      }
      <TableBody>
    <AutoSizer disableHeight>
          {({ width }) => (
            <List
              rowCount={list.length}
              width={width}
              height={height}
              rowHeight={elementHeight}
              rowRenderer={rowRenderer}
              overscanRowCount={5}
              onScroll={throttleScrollListener}
            />
          )}
    </AutoSizer>
    </TableBody>
    </Table>
  );
};

export default AutoScollTable2;