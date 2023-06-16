import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal4Search from "./Modal4Search";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  TextField,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox, // Checkbox 추가
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import Modal4ReceiveMaster from "./Modal4ReceiveMaster";
import Modal4MasterItem from "./Modal4MasterItem";
import Modal4ReceiveDetail from "./Modal4ReceiveDetail";
import Modal4Outlist from "./Modal4Outlist";
import Modal4DetailItem from "./Modal4DetailItem";
import { customFetch } from '../custom/customFetch';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { DetailsOutlined } from "@mui/icons-material";

const Modal4 = ({ open, onClose, handleButtonClick, details, releaseAdd, setreleaseDetail }) => {
// details : 출고한 품목 리스트 [{}]

  const loading = useRef(true);
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);
  const limit = 10;
  const scrollend = useRef(false);

  useEffect(() => {
    modal4receiveMasterSearch('load');
  }, []);

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [checkedRow, setCheckedRow] = useState([{ master: "", state: "f", detail: [{ no: "", state: "f" }] }]);
  const rowColor = useRef();
  const [data, setData] = useState([]);     // 추가된 출고 리스트 관리하는 state
  const [masterCode, setMasterCode] = useState();
  // ReceiveMaster
  const [modal4receiveMaster, setreceiveMaster] = useState([]);
  // ReceiveDetail
  const [modal4receiveDetail, setreceiveDetail] = useState([]);
  const [modal4outlist, setoutdetail] = useState([]);

  const [releaseMaster, setreleaseMaster] = useState([]);
  // releaseDetail
  // const [releaseDetail, setreleaseDetail] = useState([{}]);
  // const [checkItems, setCheckItems] = useState([]);
  const [nocheck, setNocheck] = useState([]);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  /* date값을 가지고 있는 */
  const [seDate, setSeDate] = useState({ sDate: '', eDate: '' });

  // receive Master 수량 미입력
  const [disable, setDisable] = useState({});
3
  // check 선택한 품목리스트
  const [pumokList, setPumokList] = useState([]);
  const [prevNoListOfDetailStateT, setPrevNoListOfDetailStateT] = useState([]);

  const searchKw = useRef({
    rcode: '',
    bname: '',
    startdt: '',
    enddt: '',
  });
  useEffect(() => {
    // setData([]);
    // rowColor.current='';
    // setreceiveDetail([]);
    // const clearCheckRow = checkedRow.filter((row) => row.state==='t' || row.detail.filter((d)=> d.state==='f'))
    // // setCheckedRow([{ master: "", state: "f", detail: [{ no: "", state: "f" }] }]);
  },[open]);

  const closeReset =() => {
    setData([]);
    rowColor.current = '';
    setreceiveDetail([]);
    onClose();
    const updatedCheckRow = checkedRow.map((item) => {
      if (item.detail) {
        const updatedDetail = item.detail.map((detailItem) => {
          if (detailItem.state === 't') {
            return { ...detailItem, state: 'f' };
          } else {
            return detailItem;
          }
        });
        return { ...item, detail: updatedDetail };
      } else {
        return item;
      }
    });
    setCheckedRow(updatedCheckRow);
  }
  useEffect(() => {
    //console.log("====== 추가된 출고 리스트 관리하는 state =====");
    // console.log(data);
    let changedModal4receiveDetail = modal4receiveDetail.map((pumokItem) => {
      let isInChulgo = false;
      data.forEach((chulgoItem) => {
        if (pumokItem.no === chulgoItem.no) {
          isInChulgo = true;
        }
      })
      return { ...pumokItem, isInChulgo: isInChulgo }
    })
    setreceiveDetail(changedModal4receiveDetail);
  }, [data]);


  useEffect(() => {

    let noListOfDetailStateT = [];
    checkedRow.forEach((item) => {
      item.detail.forEach((item2) => {
        if (item2.state === "t") {
          noListOfDetailStateT.push(item2.no);
        }
      });
    });
    let isAdd = false;
    if (prevNoListOfDetailStateT.length < noListOfDetailStateT.length)
      isAdd = true;
    setPrevNoListOfDetailStateT([...noListOfDetailStateT]);

    if (isAdd) { // 추가
      let addedNoList = noListOfDetailStateT.filter((no) => !prevNoListOfDetailStateT.includes(no));
      // let addedPumokList = modal4receiveDetail.filter((item) => addedNoList.includes(item.no));
      let addedPumokList = modal4receiveDetail.filter((item) => addedNoList.includes(item.no));
      setPumokList([...pumokList, ...addedPumokList]);
    } else { // 삭제
      let removedNoList = prevNoListOfDetailStateT.filter((no) => !noListOfDetailStateT.includes(no));
      let remainedPumokList = pumokList.filter((item) => !removedNoList.includes(item.no));
      setPumokList(remainedPumokList);
    }
  }, [checkedRow]);

  const updatePumokList = (checked, pumokListInput) => {
    if (checked) {
      setPumokList([...pumokList, ...pumokListInput]);
    } else {
      let filteredPumokList = pumokList.filter((item) => {
        let isExclude = false;
        pumokListInput.forEach((item2) => {
          if (item2.no === item.no) {
            isExclude = true;
          }
        });

        if (isExclude) {
          return false;
        } else {
          return true;
        }
      });
      setPumokList(filteredPumokList);
    }
  }

  const graybutton = (no) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        const newModal4receiveDetail = modal4receiveDetail.map((detail) =>
          detail.no === no ? { ...detail, disabled: true } : detail
        );
        setreceiveDetail(newModal4receiveDetail);
        break;
      }
    }
  };
  /* detail 리스트에서 선택 버튼 클릭 시 */

  const handleSaveClick = (datas) => {
    // datas = {no: 1, businessCode: '...', ....} / data state에 있는 [{}, {}, {}]
    let isDuplicate = false; // 중복 여부를 나타내는 변수

    for (let i = 0; i < data.length; i++) {
      if (data[i].no === datas.no) {
        isDuplicate = true;
        break; // 중복을 찾았으므로 반복문을 종료합니다.
      }
    }

    if (!isDuplicate) {
      setData([...data, datas]);
    }
  };

  const handleSaveMultiClick = (pumokList) => {
    // const List = pumokList.filter(i => !i.productCode === details.)
    const filteredList = pumokList.filter(i1 => {
      const array1 = details.some(i2 => i2.productCode === i1.productCode && i2.receiveCode === i1.receiveCode);
      const array2 = data.some(i2 => i2.productCode === i1.productCode && i2.receiveCode === i1.receiveCode);
      return !(array1 || array2);
    });

    let chulgoList = filteredList.map(item => {
      return {
        no: item.no,
        mcode: item.masterCode,
        pcode: item.productCode,
        pname: item.productName,
        psize: item.productSize,
        punit: item.productUnit,
        receivecnt: item.receiveCount,
        stockcnt: item.stockCount,
        checked: false,
      }
    });

    let filteredChulgoList = chulgoList.filter(item => {
      let isExclude = false;
      data.forEach(item2 => {
        if (item2.no === item.no) {
          isExclude = false;
        }
      });

      details.forEach(item2 => {
        if (item2.productCode === item.pcode) {
          isExclude = true;
        }
      });
      if (isExclude) {
        return false;
      } else {
        return true;
      } 
    });
    setData([...data, ...filteredChulgoList]);
  }


  // 출고 체크 박스 선택
  const chulgoItemOnChangeCheck = (no) => { // [1, 2]
    //console.log('no', no);

    let changedData = data.map((item, index) => {
      if (item.no === no) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    // console.log('changedData', changedData);
    setData(changedData);
  }

  const modal4receiveMasterSearch = async (state) => {
    if (state === 'search') {
      startIndex.current = 0;
      setreceiveMaster([]);
      loading.current = true;
      scrollend.current = false;
      setIsFetching(false);
    }
    if (isFetching) {
      return;
    }

    if (scrollend.current === true) {
      return;
    }

    setIsFetching(true);

    let startdt = '';
    let enddt = '';

    if (searchKw.current && searchKw.current.startdt === '' && searchKw.current.enddt !== '') {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(searchKw.current.enddt.$d, 'yyyy-MM-dd');
    } else if (searchKw.current && searchKw.current.enddt === '' && searchKw.current.startdt !== '') {
      startdt = format(searchKw.current.startdt.$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    } else if (searchKw.current && searchKw.current.startdt !== '' && searchKw.current.startdt && searchKw.current.enddt !== '') {
      startdt = format(searchKw.current.startdt.$d, 'yyyy-MM-dd');
      enddt = format(searchKw.current.enddt.$d, 'yyyy-MM-dd');
    } else if ((searchKw.current != null && searchKw.current.startdt === '' && searchKw.current.enddt === '') || searchKw.current === null) {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    } else {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    }
    console.log(startdt, enddt);
    console.log('searchKw', searchKw)
    var url = `/api/receive/list1?o=${startIndex.current}&l=${limit}`;
    if (searchKw) {
      url = `/api/receive/list1?o=${startIndex.current}&l=${limit}&rc=${searchKw.current.rcode}&bn=${searchKw.current.bname}&sdt=${startdt}&edt=${enddt}`;
    }

    console.log("url", url)

    if (scrollend.current === true) {
      return;
    }

    await customFetch(url, { method: 'get' }).then((json) => {
      // 넘어온 데이터의 master code 값 담기
      setreceiveMaster((pre) => [...pre, ...json.data]);
      setCheckedRow((pre) =>
        [...pre,
        ...json.data.map((item) => ({
          master: item.code,
          state: 'f',
          detail: [{ no: '', state: 'f' }],
        }))]
      );
      if (json.data !== null) {
        loading.current = false;

      }
      if (json.data.length === 0) {
        scrollend.current = true;
      }

      if (state === 'search') {
        rowColor.current = '';
        setreceiveDetail([]);
      }
    })
      .finally(() => {
        startIndex.current += 10;
        setIsFetching(false);
      });
  };

  const modal4receiveDetailSearch = async (code) => {
    //선택한 입고의 입고번호 저장
    setMasterCode(code);

    await customFetch(`/api/receive/detail1?rc=${code}`, { method: 'get' }).then((json) => {
      //console.log('-----------------------------품목리스트', json.data);
      setreceiveDetail(json.data);

      const isAnyNull = json.data.some((item) => item.state === null); // status 배열에서 하나라도 null이 있는지 확인합니다.
      console.log(isAnyNull);
      setreceiveMaster((prevDataList) => {
        return prevDataList.map((item) => {
          if (item.code === code) {
            return { ...item, disable: isAnyNull ? 'true' : 'false' }; // disable 값을 isAnyNull에 따라 설정합니다.
          }
          return item;
        });
      });

      rowColor.current = code;
      const data = addDetailArrayHandler(json.data);
      const filteredCheckedRow = data.map((row) => {
        // detail [] 배열 중 no가 빈 값인 거 제외
        const filteredDetail = row.detail.filter((detail) => detail.no !== '');
        return { ...row, detail: filteredDetail };
      });

      setCheckedRow(filteredCheckedRow);
    });
  };



  // receiveMater nullchk
  // const nullChkHandler = (inputMaster) => {
  //   console.log(inputMaster);
  //   // 아래의 값이 모두 있을경우
  //   if (
  //     inputMaster.date !== '' &&
  //     inputMaster.businessCode !== '' &&
  //     inputMaster.businessName !== '' &&
  //     inputMaster.userId !== '' &&
  //     inputMaster.userName !== ''
  //   ) {
  //     setInputMaster(inputMaster);
  //     // 새로운 product를 추가 하기 전에 reset
  //     setreceiveDetail([]);
  //     setMasterCode('');
  //     // productModal open
  //     toggleModal(openProduct, 'product');
  //     setDetailInput(true);
  //   }
  // };

  // ReceiveCntUpdate
  const updateReceiveCnt = async (count, no) => {
    const updatedData = modal4receiveDetail.map((item) => {
      if (item.no === no) {
        return {
          ...item,
          stockCount: count
        };
      }
      return item;
    });
    setreceiveDetail(updatedData);
  };

  const addDetailArrayHandler = (data) => checkedRow.map((row) => {
    const { master } = row;   // row(하나의 객체)에 있는 master 프로퍼티 값을 사용한다
    const matchingData = data.filter((d) => d.masterCode === master);
    const existingDetail = row.detail || []; // 기존의 detail 값이 없으면 빈 배열로 초기화
    const existingNoArray = existingDetail.map((d) => d.no); // 기존의 no 값 배열 추출
    const matchingNoArray = matchingData.map((d) => d.no); // 매칭된 no 값 배열 추출
    const newNoArray = matchingNoArray.filter((no) => !existingNoArray.includes(no)); // 기존에 없는 no 값만 추출
    const newDetail = existingDetail.concat(newNoArray.map((no) => ({ no, state: 'f' }))); // 새로운 no 값들과 기존의 detail 값 합치기
    return {
      ...row,
      detail: newDetail,
    };
  });
  return (
    <Box>
      <Modal open={open} onClose={closeReset}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            width: "90%",
            padding: '20px',
            height: "90%",
            borderRadius: "8px",
          }}
        >
          <Grid container style={{ height: '100%' }}>
            <Modal4Search callback={modal4receiveMasterSearch} searchKw={searchKw} seDate={seDate} />
            <Modal4ReceiveMaster
              masters={modal4receiveMaster}
              modal4receiveDetail={modal4receiveDetailSearch}
              checkedRow={checkedRow}
              setCheckedRow={setCheckedRow}
              rowColor={rowColor}
              updatePumokList={updatePumokList}
              setPumokList={setPumokList}
              modal4receiveMasterSearch={modal4receiveMasterSearch}
              loading={loading}
            />
            <Modal4ReceiveDetail 
              details={modal4receiveDetail}
              pumokList={pumokList}
              checkedRow={checkedRow}
              setCheckedRow={setCheckedRow}
              clicks={handleSaveClick}
              multiClicks={handleSaveMultiClick}
              data={data}
              setData={setData}
              outdetails={details}
              setreceiveDetail={setreceiveDetail}
              modal4receiveDetail={modal4receiveDetail}
              updateReceiveCnt={updateReceiveCnt}
              graybutton={graybutton}

            />
            <Modal4Outlist
              outdtail={modal4outlist}
              selectedRowData={selectedRowData}
              data={data}
              chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
              setData={setData}
              checkedRow={checkedRow}
              handleButtonClick={handleButtonClick}
              releaseAdd={releaseAdd}
              details={modal4receiveDetail}
              outdetails={details}
              updateReceiveCnt={updateReceiveCnt}
              setCheckedRow={setCheckedRow}
            />
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default Modal4;