import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { customFetch } from "../custom/customFetch";

export default function Modal3({ open, onClose, handleButtonClick }) {
  useEffect(() => {
    searchKWDfetch();

    return () => {
      setPerson([]);
      setSearchKWD({ code: "", phone: "" });
      setModal({
        isLoading: false,
        hasMore: true,
        isChange: false,
      });
      page.current = 0;
      console.log("close modal");
    };
  }, [open]);

  const page = useRef(0);

  const [person, setPerson] = useState([]);
  const [searchKWD, setSearchKWD] = useState({ code: "", phone: "" });
  const [modal, setModal] = useState({
    isLoading: false,
    hasMore: true,
    isChange: false,
  });

  const onEnterHandler = () => {
    if (window.event.keyCode == 13) {
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    modalChange({ pageNumber: 0 });
    setPerson([]);
    searchKWDfetch();
  };

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKWD((prev) => ({ ...prev, [name]: value }));
  };

  const modalChange = (obj) => {
    setModal((prev) => ({ ...prev, ...obj }));
  };

  const searchKWDfetch = async () => {
    modalChange({ isLoading: true });
    await customFetch(`/api/business/search?page=${page.current}&offset=${5}`, {
      method: "post",
      body: JSON.stringify(searchKWD),
    })
      .then((json) => {
        if (json.data.length < 5) {
          modalChange({ hasMore: false });
        }
        setPerson((prev) => [...prev.slice(-5), ...json.data]);
        modalChange({ isLoading: false });
      })
      .catch(() => modalChange({ isLoading: false }));
  };

  const searchUpKWDfetch = async () => {
    modalChange({ isLoading: true });
    page.current -= 1;
    await customFetch(`/api/business/search?page=${page.current}&offset=${5}`, {
      method: "post",
      body: JSON.stringify(searchKWD),
    })
      .then((json) => {
        setPerson((prev) => [
          ...json.data,
          ...prev.slice(person.length % 5 === 0 ? 5 : person.length % 5),
        ]);
        modalChange({ hasMore: true, isLoading: false });
      })
      .catch(() => modalChange({ isLoading: false }));
  };

  const handleScroll = (event) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.target;
    // scrollTop: 스크롤된 높이, offsetHeight: 요소의 총 높이, scrollHeight 스크롤할수있는 최대높이
    if (
      scrollTop + offsetHeight === scrollHeight &&
      modal.hasMore &&
      !modal.isLoading
    ) {
      page.current += 1;
      searchKWDfetch();
      event.target.scrollTop = 12;
      console.log(
        "scrollTop:",
        scrollTop,
        "offsetHeight:",
        offsetHeight,
        "scrollHeight:",
        scrollHeight
      );
    } else if (scrollTop === 0 && page.current > 0) {
      searchUpKWDfetch();
      event.target.scrollTop = scrollHeight - 160;
      console.log(event.target.scrollTop, " ", offsetHeight, " ", scrollHeight);
    }
  };

  window.addEventListener("scroll", handleScroll);

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
                검색어
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
          <Box
            sx={{
              width: "800px",
              height: "190px",
              overflow: "auto",
              inlineSize: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            onScroll={handleScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ background: "#F6F7F9" }}>
                  <TableCell align="center">순번</TableCell>
                  <TableCell align="center">거래처코드</TableCell>
                  <TableCell align="center">거래처명</TableCell>
                  <TableCell align="center">전화번호</TableCell>
                  <TableCell align="center">선택</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {person.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {(page.current > 0 ? page.current - 1 : 0) * 5 +
                        index +
                        1}
                    </TableCell>
                    <TableCell align="center">{data.code}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.phone}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ width: "100%", p: 0 }}
                        onClick={() => {
                          handleButtonClick("business", {
                            businessCode: data.code,
                            businessName: data.name,
                          });
                        }}
                      >
                        선택
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
