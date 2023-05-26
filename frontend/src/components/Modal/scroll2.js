import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import {
//   CellMeasurerCache,
//   CellMeasurer,
//   InfiniteLoader,
//   List,
//   AutoSizer,
//   Table,
//   Column,
// } from "react-virtualized";
// import "react-virtualized/styles.css";

export default function Modal3({ open, onClose }) {
  const [person, setPerson] = useState([]);
  const [searchKWD, setSearchKWD] = useState({ code: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  //   const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    return () => {
      setPerson([]);
    };
  }, [open]);

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKWD((prev) => ({ ...prev, [name]: value }));
  };

  const searchKWDfetch = async (startIndex, stopIndex) => {
    console.log("startIndex:", startIndex, "stopIndex:", stopIndex);
    setLoading(true);
    try {
      const response = await fetch(
        `/api/business/search?offset=${startIndex}&limit=${10}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(searchKWD),
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setHasNextPage(json.data.length === 10);
      setPerson((prev) => [...prev, ...json.data]);
      console.log(json.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log("loadMoreRows:", startIndex, stopIndex);
    if (!loading && hasNextPage) {
      //   setStartIndex(startIndex);
      searchKWDfetch(startIndex, stopIndex);
    }
  };

  const isRowLoaded = ({ index }) => !hasNextPage || index < person.length;

  const onEnterHandler = () => {
    if (window.event.keyCode == 13) {
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    setPerson([]);
    searchKWDfetch();
  };

  function rowRenderer({ index, key, parent, style }) {
    if (!isRowLoaded({ index })) {
      return (
        <div key={key} style={style}>
          Loading...
        </div>
      );
    }
    console.log(style);
    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <div style={style} key={person[index].code}>
            <div align="center">{index + 1}</div>
            <div align="center">{person[index].code}</div>
            <div align="center">{person[index].name}</div>
            <div align="center">{person[index].phone}</div>
            <div align="center">선택</div>
          </div>
        )}
      </CellMeasurer>
    );
  }

  return (
    <Box>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box
            variant="h6"
            sx={{
              fontSize: "28px",
              textAlign: "center",
              mb: "20px",
            }}
          >
            거래처
          </Box>
          <Box>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                float: "right",
              }}
            >
              <Box
                sx={{
                  lineHeight: "40px",
                  pl: 1,
                }}
              >
                이름
              </Box>
              <TextField
                size="small"
                sx={{
                  pl: 1,
                }}
                onChange={onChangeHandler}
                onKeyUp={onEnterHandler}
                value={searchKWD.code}
                name="code"
              ></TextField>
              <Box
                sx={{
                  lineHeight: "40px",
                  pl: 1,
                }}
              >
                전화번호
              </Box>
              <TextField
                size="small"
                sx={{
                  pl: 1,
                }}
                onChange={onChangeHandler}
                onKeyUp={onEnterHandler}
                value={searchKWD.phone}
                name="phone"
              ></TextField>
              <Button>
                <SearchIcon onClick={onClickHandler} />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "80px",
              borderBottom: "0.5px solid #e9e9e9",
            }}
          />

          <AutoSizer>
            {({ width, height }) => (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={hasNextPage ? person.length + 1 : person.length}
                height={height} // Use height from AutoSizer
                width={width} // Use width from AutoSizer
              >
                {({ onRowsRendered, registerChild }) => (
                  <Box
                    sx={{
                      width: width,
                      height: height,
                      overflow: "auto",
                      inlineSize: "auto",
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <div>
                      <div sx={{ background: "#F6F7F9" }}>
                        <div align="center">순번</div>
                        <div align="center">아이디</div>
                        <div align="center">이름</div>
                        <div align="center">전화번호</div>
                        <div align="center">선택</div>
                      </div>
                    </div>
                    <div sx={{ width: "900px", height: "200px" }}>
                      <Table
                        width={width}
                        height={height}
                        rowCount={
                          hasNextPage ? person.length + 1 : person.length
                        }
                        rowHeight={cellMeasurerCache.rowHeight}
                        rowRenderer={rowRenderer}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                      >
                        <Column label="번호" dataKey="index" width={100} />
                        <Column label="아이디" dataKey="id" width={200} />
                        <Column label="이름" dataKey="name" width={100} />
                        <Column label="전화번호" dataKey="phone" width={100} />
                        <Column label="선택" width={100} />
                      </Table>
                    </div>
                  </Box>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </Box>
      </Modal>
    </Box>
  );
}
