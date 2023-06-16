import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import ReleaseMaster from './ReleaseMaster';
import ReleaseDetail from './ReleaseDetail';
import ManagerModal from '../Modal/ManagerModal';
import ProductsModal from '../Modal/ProductsModal';
import BusinessModal from '../Modal/BusinessModal';
import DeleteMasterModal from '../Modal/DeleteMasterModal';
import DeleteDetailModal from '../Modal/DeleteDetailModal';
import NullModal from '../Modal/NullModal';
import { customFetch } from '../custom/customFetch';
import Modal4 from '../Modal/Modal4';
import { format } from 'date-fns';
import dayjs from 'dayjs';

const Release = () => {
  /* 화면에 랜더링되는 state */
  const [releaseMaster, setreleaseMaster] = useState([]); // ReleaseMaster
  const [releaseDetail, setreleaseDetail] = useState([{}]); // releaseDetail

  /* Master Code */
  const [masterCode, setMasterCode] = useState();
  /* 체크박스를 다루기 위한 state */
  const [checkedRow, setCheckedRow] = useState([{ master: '', state: 'f', detail: [{ no: '', state: 'f' }] }]);
  const loading = useRef(true);
  /* Modal */
  const [openDeleteModalInMaster, setOpenDeleteModalInMaster] = useState(false); // 삭제할 것인지 확인하는 모달창(Master)
  const [openDeleteModalInDetail, setOpenDeleteModalInDetail] = useState(false); // 삭제할 것인지 확인하는 모달창(Detail)
  const [openNullModal, setOpenNullModal] = useState(false); // 삭제할 것인지 확인하는 모달창(체크된 데이터가 없을 때 띄어주는 모달창)

  const [openManager, setOpenManager] = useState(false);
  const [openBusiness, setOpenBusiness] = useState(false);
  const [openReleaseInsert, setOpenReleaseInsert] = useState(false);

  // ReleaseMaster data(date,business,manager)
  const [inputMaster, setInputMaster] = useState({
    date: '',
    businessCode: '',
    businessName: '',
    userId: '',
    userName: '',
  });
  /* detail 리스트에 있는 input 창을 나타낼지 말지를 결정하는 state */
  const [detailInput, setDetailInput] = useState(false);

  const rowColor = useRef(); // Master 행 클릭 시 background 색상 변경 Ref
  const searchKw = useRef({ rcode: '', bname: '', startdt: '', enddt: '' });
  const masterStateT = checkedRow.filter((row) => row.state === 't').map((row) => row.master);

  // checkedRow에 detail 프로퍼티가 없어서 에러가 계속 발생 -> filter로 detail 프로퍼티가 존재하는지 먼저 거르고 시작
  const filteredRow = checkedRow.filter((row) => row.detail !== undefined);
  const filteredDetails = filteredRow
    .filter((row) => row.master === masterCode) // master 코드가 같은 것 / flatMap: 배열 내 요소들을 변환하고, 각 변환된 배열 요소를 하나의 배열로 합치는 함수
    .flatMap((row) => row.detail.filter((detail) => detail.state === 't' && detail.no !== ''))
    .map((detail) => detail.no);

  const deleteObj = {
    no: filteredDetails, // checkedRow의 detail 프로퍼티에서 state값이 "t"인 데이터의 no값
    masterCode: masterCode, // 화면에 표시되는 detail List들의 공통된 master code값
    length: releaseDetail.length, // 화면에 표시되는 detail List들의 길이
  };

  const [isFetchingMaster, setIsFetchingMaster] = useState(false);
  const startIndexMaster = useRef(0);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const startIndexDetail = useRef(0);
  const limit = 10;
  const scrollend = useRef(false);

  useEffect(() => {
    releaseMasterSearch('load');
  }, []);

  const toggleModal = (open, modal) => {
    if (modal === 'manager') {
      open ? setOpenManager(false) : setOpenManager(true);
    } else if (modal === 'releaseInsert') {
      open ? setOpenReleaseInsert(false) : setOpenReleaseInsert(true);
    } else if (modal === 'business') {
      open ? setOpenBusiness(false) : setOpenBusiness(true);
    } else if (modal === 'deleteMaster') {
      open ? setOpenDeleteModalInMaster(false) : setOpenDeleteModalInMaster(true);
    } else if (modal === 'deleteDetail') {
      open ? setOpenDeleteModalInDetail(false) : setOpenDeleteModalInDetail(true);
    } else if (modal === 'null') {
      open ? setOpenNullModal(false) : setOpenNullModal(true);
    }
  };

  const handleButtonClick = (key, data) => {
    if (key === 'releaseInsert') {
      setOpenReleaseInsert(false);
    } else if (key === 'manager') {
      setInputMaster({
        ...inputMaster,
        userId: data.userId,
        userName: data.userName,
      });
      setOpenManager(false);
    } else if (key === 'business') {
      setInputMaster({
        ...inputMaster,
        businessCode: data.businessCode,
        businessName: data.businessName,
      });
      setOpenBusiness(false);
    }
  };

  /** 아래의 값이 모두 있을경우 */
  const nullChkHandler = (inputMaster) => {
    if (
      inputMaster.date !== '' &&
      inputMaster.businessCode !== '' &&
      inputMaster.businessName !== '' &&
      inputMaster.userId !== '' &&
      inputMaster.userName !== ''
    ) {
      setInputMaster(inputMaster);

      setreleaseDetail([{}]); // 새로운 product를 추가 하기 전에 reset
      setMasterCode('');

      toggleModal(openReleaseInsert, 'releaseInsert'); // Release insert Madal open
      setDetailInput(true);
    }
  };

  // ============================ release Master검색 ============================
  const releaseMasterSearch = async (state) => {
    if (state === 'search') {
      startIndexMaster.current = 0;
      setreleaseMaster([]);
      loading.current = true;
      scrollend.current = false;
      setIsFetchingMaster(false);
    }
    console.log(isFetchingMaster);
    if (isFetchingMaster) {
      return;
    }
    setIsFetchingMaster(true);
    //etLoading(true);
    let startdt = '';
    let enddt = '';

    if (searchKw.current && searchKw.current.startdt === '' && searchKw.current.enddt !== '') {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(searchKw.enddt.$d, 'yyyy-MM-dd');
    } else if (searchKw.current && searchKw.current.enddt === '' && searchKw.current.startdt !== '') {
      startdt = format(searchKw.current.startdt.$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    } else if (searchKw.current && searchKw.current.startdt !== '' && searchKw.current.enddt !== '') {
      startdt = format(searchKw.current.startdt.$d, 'yyyy-MM-dd');
      enddt = format(searchKw.current.enddt.$d, 'yyyy-MM-dd');
    } else if (
      (searchKw.current != null && searchKw.current.startdt === '' && searchKw.current.enddt === '') ||
      searchKw.current === null
    ) {
      startdt = format(dayjs().subtract(6, 'day').$d, 'yyyy-MM-dd');
      enddt = format(dayjs().add(6, 'day').$d, 'yyyy-MM-dd');
    }

    var url = `/api/release/list?o=${startIndexMaster.current}&l=${limit}`;

    if (searchKw) {
      url = `/api/release/list?o=${startIndexMaster.current}&l=${limit}&ic=${searchKw.current.rcode}&bn=${searchKw.current.bname}&sdt=${startdt}&edt=${enddt}`;
    }

    if (scrollend.current === true) {
      return;
    }

    await customFetch(url, { method: 'get' }).then((json) => {

      setreleaseMaster((pre) => [...pre, ...json.data]);
      setCheckedRow((pre) => {    // pre, json.data가 중복되는 에러가 있어서 중복 제거하고 setCheckedRow
        const existingCodes = pre.map((item) => item.master);
        const newData = json.data.filter((item) => !existingCodes.includes(item.code));
      
        const updatedData = [
          ...pre,
          ...newData.map((item) => ({
            master: item.code,
            state: 'f',
            detail: [{ no: '', state: 'f' }],
          })),
        ];
      
        return updatedData;
      });
      // 넘어온 데이터의 master code 값 담기
      // rowColor.current = ''; // Master 행 선택 시 Background Color 변경했던 거 Clear
  
      if (json.data !== null) {
        loading.current = false;
      }
      if (json.data.length === 0) {
        scrollend.current = true;
      }

      if (state === 'search') {
        rowColor.current = '';
        setreleaseDetail([{}]); // 검색 했을 때 기존에 있는 releaseDetail List Clear
      } 
    })
    .finally(() => {
      startIndexMaster.current += 10;
      setIsFetchingMaster(false);
    });
  };

  // ============================ Release Detail ============================
  const releaseDetailSearch = async (code) => {
    //선택한 출고의 출고번호 저장
    setIsFetchingDetail(true);
    await customFetch(`/api/release/detail?ic=${code}`, { method: 'get' }).then((json) => {
      // console.log(json.data);
      setreleaseDetail(json.data);
      const isAnyNull = json.data.some((item) => item.state === null); // status 배열에서 하나라도 null이 있는지 확인합니다.
      // console.log(isAnyNull);
      setreleaseMaster((prevDataList) => {
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

      setMasterCode(code);
      setCheckedRow(filteredCheckedRow);
    });
  };

  // ============================ release insert ============================
  const releaseAdd = async (selectList) => {
    //selectList: 출고 detail List에 있는 데이터를 제외하고 출고를 위해서 추가된 데이터 === data state: [{code: "RV0000000510", no: 8, ...}, {...}, ...]

    var url = '';
    var data = '';

    selectList.map((item) => console.log(item));
    /* vo에 담기 위해서 detailVo 형태로 key값 변경 */
    const transformedList = selectList.map((item) => ({
      receiveDetailNo: item.no,
      receiveCode: item.mcode,
      productCode: item.pcode,
      productName: item.pname,
      productSize: item.psize,
      productUnit: item.punit,
      stockCnt: item.stCnt,
      count: item.releaseCnt,
    }));
    // 어느 Master도 클릭하지 않은 상태에서 오로지 추가만 할 때
    if (releaseDetail === null || releaseDetail === {} || releaseDetail === [] || masterCode === '') {
      url = '/api/release/insert';
      data = {
        ...inputMaster,
        releaseDetails: transformedList,
      };
    } else {
      // release Detail Insert
      url = '/api/release/insertdetail';
      data = transformedList.map((obj) => {
        //masterCode set
        return {
          ...obj,
          masterCode: masterCode,
        };
      });
    }

    await customFetch(url, { method: 'post', body: JSON.stringify(data) }).then((json) => {
      // json.data: {businessCode: "...", businessName: "...", code: "...", releaseDetails: [{}, {}, ..], userId: "", userName: ""}
      if (json.data.code) {
        /* receiveMaster,receiveDetail Add */
        // 등록 후 선택(rowColor Set)
        rowColor.current = json.data.code;

        setMasterCode(json.data.code);
        setreleaseDetail(json.data.releaseDetails);
        setreleaseMaster((DetailList) => [
          {
            code: json.data.code,
            businessName: json.data.businessName,
            userName: json.data.userName,
            date: json.data.date,
          },
          ...DetailList,
        ]);
        setCheckedRow((checkedRow) => [
          ...checkedRow,
          {
            master: json.data.code,
            state: 'f',
            detail: json.data.releaseDetails.map((item) => ({
              no: item.no,
              state: 'f',
            })),
          },
        ]);
      } else {
        /* releaseDetail Add */
        json.data.map((item) => {
          setreleaseDetail((DetailList) => [...DetailList, item]);
        });

        const updatedCheckedRow = checkedRow.map((row) => {
          if (row.master === masterCode) {
            const updatedDetail = row.detail.concat(json.data.map((detail) => ({ no: detail.no, state: 'f' })));
            console.log(updatedDetail);
            return { ...row, detail: updatedDetail };
          } else {
            return row;
          }
        });

        setCheckedRow(updatedCheckedRow);
      }
      setInputMaster({ date: '', businessCode: '', businessName: '', userId: '', userName: '' });
    });
  };

  // ============================ Delete Handler ============================
  const deleteMasterHandler = async (masterNo) => {
    try {
      const response = await fetch(`/api/release/deleteMaster`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(masterNo),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
      setreleaseDetail([{}]); // detail 리스트도 clear
      setCheckedRow(checkedRow.filter((row) => row.state !== 't'));
      releaseMasterSearch('search'); // master 리스트 update
    } catch (err) {
      console.log(err);
    }
  };

  // ============================ Delete Handler ============================
  const deleteDetailHandler = async (detail) => {
    // detail: {no: [], masterCode: "", length: } / no: state가 "t"인 no값들, length: 화면에 보이는 detail의 length
    try {
      const response = await fetch(
        `/api/release/deleteDetail?no=${detail.no}&masterCode=${detail.masterCode}&length=${detail.length}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }

      detail.no.length === detail.length
        ? (setreleaseDetail([{}]), releaseMasterSearch('search'))
        : (setCheckedRow(updatedCheckedRow(detail)), setreleaseDetail(releaseDetail.filter((d) => !detail.no.includes(d.no))));
    } catch (err) {
      console.log(err);
    }
  };

  /** Master행 클릭 시 해당하는 detail List를 불러오면서(api) checkedRow state에 데이터를 담는 함수 */
  const addDetailArrayHandler = (data) =>
    checkedRow.map((row) => {
      const { master } = row; // row(하나의 객체)에 있는 master 프로퍼티 값을 사용한다
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

  const updatedCheckedRow = (deleteData) =>
    checkedRow.map((row) => {
      if (row.master === deleteData.masterCode) {
        const updatedDetail = row.detail.filter((detail) => !deleteData.no.includes(detail.no));
        return { ...row, detail: updatedDetail };
      }
      return row;
    });

    const modalMessage = () => {  // masterStateT를 사용하지 않은 이유 - delete 작업 후에 우리가 checkedRow만 update 해줘서
      const length = checkedRow.filter((row) => row.state === 't').length;

      if (releaseMaster.length === length) {
        return '출고 기록 전체를 삭제하시겠습니까?';
      }
      if (length === 0) {
        return 0;
      }
      if (length === 1) {
        console.log(masterStateT);
        return masterStateT[0] + '을 삭제하시겠습니까?';
      }
      return length + '개의 출고 정보를 삭제하시겠습니까?';
    };

    const modalDetailMessage = () => {
      const length = deleteObj.no.length;
      // if (submitError.current != '') {
      //   return submitError.current;
      // }
      if (releaseDetail.length === length) {
        return deleteObj.masterCode + '의 기록 전체를 삭제하시겠습니까?';
      }
      if (length === 0) {
        return 0;
      }
      if (length === 1) {
        return deleteObj.no[0] + '을 삭제하시겠습니까?';
      }
      return length + '개의 정보를 삭제하시겠습니까?';
    };

  return (
    <Box>
      <ManagerModal open={openManager} onClose={() => setOpenManager(false)} handleButtonClick={handleButtonClick} />
      <BusinessModal open={openBusiness} onClose={() => setOpenBusiness(false)} handleButtonClick={handleButtonClick} />
      <Modal4
        open={openReleaseInsert}
        onClose={() => setOpenReleaseInsert(false)}
        handleButtonClick={handleButtonClick}
        details={releaseDetail}
        setreleaseDetail={setreleaseDetail}
        releaseAdd={releaseAdd}
      />
      <DeleteMasterModal
        open={openDeleteModalInMaster}
        onClose={() => setOpenDeleteModalInMaster(false)}
        deleteMasterHandler={deleteMasterHandler}
        data={masterStateT}
      />
      <DeleteDetailModal
        open={openDeleteModalInDetail}
        onClose={() => setOpenDeleteModalInDetail(false)}
        deleteDetailHandler={deleteDetailHandler}
        data={deleteObj}
      />
      <NullModal open={openNullModal} onClose={() => setOpenNullModal(false)} />

      <Grid container spacing={2} style={{ marginLeft: '0px' }}>
        <SearchBar callback={releaseMasterSearch} searchKw={searchKw} />
        <ReleaseMaster
          masters={releaseMaster}
          releaseDetail={releaseDetailSearch}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          rowColor={rowColor}
          toggleModal={toggleModal}
          openNullModal={openNullModal}
          openDeleteModalInMaster={openDeleteModalInMaster}
          openManager={openManager}
          openBusiness={openBusiness}
          nullChkHandler={nullChkHandler}
          inputMaster={inputMaster}
          setInputMaster={setInputMaster}
          masterStateT={masterStateT}
          loading={loading}
          releaseMasterSearch={releaseMasterSearch}
          modalMessage={modalMessage}
          deleteMasterHandler={deleteMasterHandler}
        />
        <ReleaseDetail
          details={releaseDetail}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          masterCode={masterCode}
          toggleModal={toggleModal}
          openNullModal={openNullModal}
          filteredDetails={filteredDetails}
          openDeleteModalInDetail={openDeleteModalInDetail}
          openReleaseInsert={openReleaseInsert}
          detailInput={detailInput}
          deleteDetailHandler={deleteDetailHandler}
          deleteObj={deleteObj}
          modalDetailMessage={modalDetailMessage}
        />
      </Grid>
    </Box>
  );
};

export default Release;
