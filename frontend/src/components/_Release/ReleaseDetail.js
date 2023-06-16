import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import DetailItem from "./DetailItem";
import checkImg from "../../assets/img/checkmark.png";
import SearchIcon from "@mui/icons-material/Search";
import Swal from 'sweetalert2';

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 39px;
    p: 0;
    height: 30px;
  }
`;

const ReleaseDetail = ({ 
    details, 
    checkedRow,
    setCheckedRow,
    masterCode,
    toggleModal,
    openNullModal,
    filteredDetails,
    openDeleteModalInDetail,
    openReleaseInsert,
    detailInput,
    deleteDetailHandler,
    deleteObj,
    modalDetailMessage
  }) => {
    /** 모두 선택해주는 체크박스 (detail header부분의 체크박스) */
    const detailAllCheckBox = (checked) => {
      const updatedCheckedRow = checkedRow.map((row) => {
        if (row.master === masterCode) {
          const updatedDetail = row.detail.map((detail) => {
            return { ...detail, state: checked ? 't' : 'f' };
          });
      
          return {
            ...row,
            state: checked ? 't' : 'f',
            detail: updatedDetail,
          };
        }
      
        return row;
      });
      
      setCheckedRow(updatedCheckedRow);    
    }

    /** detail All Check를 위한 객체 */
    const filteredRows = checkedRow.filter(row =>
      row.detail.some(detail => 
        details.some(item => item.no === detail.no && detail.state === 't')
      )
    );
    
    return (
      <Grid
        item
        xs={12}
        sx={{
          width: "100%",
          height: 360,
          backgroundColor: "#FFF",
          borderRadius: "8px",
          boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", paddingLeft: 3, width: "94%" }}>
          <Box
            component="img"
            src={checkImg}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
          <span
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: 800,
              marginRight: "15px",
              marginTop: "5px",
              marginLeft: "10px",
            }}
          >
            품목리스트
          </span>
          <DeleteIcon
            sx={{
              padding: "7px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            onClick={() => {
              modalDetailMessage() === 0 ? Swal.fire('', '체크된 데이터가 존재하지 않습니다.', 'warning') 
            : Swal.fire({
              text: modalDetailMessage(),
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '삭제',
            }).then((result) => {
                if (result.isConfirmed) {
                  deleteDetailHandler(deleteObj);
                  Swal.fire('Deleted!', '삭제가 완료되었습니다', 'success');  
                }
            })
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <FormControl component="form">
            <TableContainer
              component={Paper}
              sx={{
                width: "94%",
                paddingLeft: 3,
                paddingTop: 0,
                boxShadow: "none",
                height: 300,
                // marginLeft: "40px",
              }}
              // onScroll={handleScroll}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "5%",
                        backgroundColor: "#F6F7F9",
                        p: 0,
                        textAlign: "center",
                      }}
                    >
                      <Checkbox 
                          size="small"
                          onChange={(e) => {
                            detailAllCheckBox(e.currentTarget.checked);
                          }}
                          checked={(details.length === (filteredRows[0] !== undefined && filteredRows[0].detail.filter((el) => el.state === "t").length)) || (checkedRow.some(row => row.master === masterCode && row.state === 't'))}
                          disabled={checkedRow.filter(row => row.master === masterCode && row.state === "t" && !row.detail.every(item => item.state === "t")).length > 0 ? true : false}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "8%", backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      순번
                    </TableCell>
                    <TableCell sx={{ width: "15%", backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      입고번호
                    </TableCell>
                    <TableCell sx={{ width: "15%", backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      품번
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      품명
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      단위
                    </TableCell>
                    <TableCell sx={{ width: "12%", backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      규격
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      수량
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: '800' }}>
                      진행상태
                    </TableCell>
                  </TableRow>
                  {detailInput || ((!details[0] || Object.keys(details[0]).length !== 0) && masterCode && details.length) > 0 ? (
                    <TableRow>
                      <TableStickyTypeCell></TableStickyTypeCell>
                      <TableStickyTypeCell></TableStickyTypeCell>
                      <TableStickyTypeCell></TableStickyTypeCell>
                      <TableStickyTypeCell>
                      <Box
                          sx={{
                            p: 0,
                            border: "1px solid #C4C4C4",
                            height: "28px",
                            display: "flex",
                            width: "190px",
                            marginRight: "5px",
                            borderRadius: "4px",
                            paddingRight: "8px",
                          }}
                        >
                          <input
                            type="text"
                            style={{
                              marginLeft: "1px",
                              width: "140px",
                              height: "27px",
                              border: 0,
                            }}
                            placeholder="품번"
                            onClick={() => {
                              toggleModal(openReleaseInsert, 'releaseInsert');
                            }}
                          />
                          <SearchIcon
                            sx={{ marginLeft: "auto", marginTop: "3px" }}
                            onClick={() => {
                              toggleModal(openReleaseInsert, 'releaseInsert');
                            }}
                          />
                        </Box>
                      </TableStickyTypeCell>
                      <TableStickyTypeCell></TableStickyTypeCell>
                      <TableStickyTypeCell></TableStickyTypeCell>
                      <TableStickyTypeCell></TableStickyTypeCell>
                      <TableStickyTypeCell></TableStickyTypeCell>
                      <TableStickyTypeCell></TableStickyTypeCell>
                    </TableRow>
                  ) : null}
                </TableHead>
                <TableBody>
                  {(!details[0] || Object.keys(details[0]).length !== 0) && masterCode && details.length > 0 ? (
                    details.map((detail, index) => (
                      <DetailItem
                        key={index}
                        no={index}
                        code={detail.no}
                        rvCode={detail.receiveCode}
                        mcode={detail.masterCode}
                        pcode={detail.productCode}
                        pname={detail.productName}
                        psize={detail.productUnit}
                        putil={detail.productSize}
                        releasecnt={detail.count}
                        checkedRow={checkedRow}
                        setCheckedRow={setCheckedRow}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} sx={{ textAlign: "center" }}>
                        확인하려는 출고리스트를 클릭해주세요.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </FormControl>
        </Box>
      </Grid>
    );
};

export default ReleaseDetail;
