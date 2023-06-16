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
  Button,
  checkcode,
  handleSingleCheck,
  checkItems,
  data,
  button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React, { useState } from "react";
import Modal4DetailItem from "./Modal4DetailItem";
import checkImg from "../../assets/img/checkmark.png";
/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 43px;
    p: 0;
    height: 30px;
  }
`;
const Modal4ReceiveDetail = ({
  details,
  pumokList,
  clicks,
  checkedRow,
  setCheckedRow,
  multiClicks,
  data,
  setData,
  outdetails,
  updateReceiveCnt,
  textClick,
  modal4receiveDetail,
  setreceiveDetail,
  graybutton
}) => {


  const [allCheckboxesDisabled, setAllCheckboxesDisabled] = useState(false);

  const handleAllCheckboxesDisabled = (disabled) => {
    setAllCheckboxesDisabled(disabled);
  };

  details[0] !== undefined ? console.log("1111", details[0].masterCode) : null;
  const detailAllCheckBox = (checked) => {
    const updatedCheckedRow = checkedRow.map((row) => {
      if (details.length > 0 && row.master === details[0].masterCode) {
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
  const filteredRows = checkedRow.filter(row =>
    row.detail.some(detail =>
      details.some(item => item.no === detail.no && detail.state === 't')
    )
  );

  const disabledchecked = (no) => {
    const updatedData = modal4receiveDetail.map((item) => {
      if (item.no === no) {
        return {
          ...item,
          disabled: true
        };
      }
      return item;
    });
    setreceiveDetail(updatedData);
  };

  return (
    <Grid item xs={12} md={12} style={{ height: '20%' }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFF",
          marginTop: '-35px',
        }}
      >
        <Box sx={{ display: "flex", paddingLeft: 0, width: "100%" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 800,
              marginBottom: '5px',
            }}
          >
            품목리스트
          </span>
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
                width: "100%",
                paddingTop: 0,
                boxShadow: "none",
                height: 157,
              }}
            // onScroll={handleScroll}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow sx={{ height: 3 }}>
                    <TableCell sx={{ width: "5%", backgroundColor: "#F6F7F9", p: 0 }}>
                      <Checkbox
                        size="small"
                        onChange={(e) => {
                          detailAllCheckBox(e.currentTarget.checked);
                        }}
                        checked={(details.length === (filteredRows[0] !== undefined && filteredRows[0].detail.filter((el) => el.state === "t").length)) || (checkedRow.some(row => row.master === details?.[0]?.masterCode && row.state === 't'))}
                        disabled={
                          checkedRow.filter(row => row.master === details?.[0]?.masterCode && row.state === "t" && !row.detail.every(item => item.state === "t")).length > 0 ? true : false}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      순번
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      품번
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      품명
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      규격
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      단위
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      수량
                    </TableCell>
                    <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9", fontWeight: 900 }}>
                      잔량
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.length > 0 && details.filter(item => item.stockCount> 0).length > 0? (
                    details.filter(item => item.stockCount> 0).map((detailss, index) => (
                      <Modal4DetailItem
                        key={index}
                        index={index}
                        no={detailss.no}
                        mcode={detailss.masterCode}
                        pcode={detailss.productCode}
                        pname={detailss.productName}
                        psize={detailss.productSize}
                        putil={detailss.productUnit}
                        receivecnt={detailss.receiveCount}
                        stockcnt={detailss.stockCount}
                        code={detailss.no}
                        clicks={clicks}
                        checkedRow={checkedRow}
                        setCheckedRow={setCheckedRow}
                        data={data}
                        setData={setData}
                        outdetails={outdetails}
                        updateReceiveCnt={updateReceiveCnt}
                        textClick={textClick}
                        modal4receiveDetail={modal4receiveDetail}
                        setreceiveDetail={setreceiveDetail}
                        graybutton={graybutton}
                        disabled={detailss.disabled}
                        isInChulgo={detailss.isInChulgo}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} sx={{ textAlign: "center" }}>
                        선택한 입고에 출고할 수 있는 품목이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                height: '36px',
                marginLeft: 'auto',
              }}
              onClick={() => {
                // const data = (입고 품목(details) && stockCnt > 0) - 출고 품목(outdetails)
                // 입고 품목의 no === 출고 품목의 no 한 데이터를 빼주기
                const stockCntNotZeroData = pumokList.filter(item => item.stockCount> 0);
                multiClicks(stockCntNotZeroData);
              }}>
              <strong>추가</strong>
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Modal4ReceiveDetail;
