import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Modal } from '@mui/material';
import error from '../../assets/img/error.png';
const DeleteMasterModal = ({ open, onClose, deleteMasterHandler, data }) => {
  return (
    <Box>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 130,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 5,
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', mb: '20px' }}>
            <Box component="img" src={error} sx={{ width: '40px' }} />
            <Box
              variant="h6"
              sx={{
                fontSize: '20px',
                marginTop: '10PX',
                marginLeft: '5px',
              }}
            >
              삭제
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: '13px',
              mb: '25px',
              textAlign: 'center',
            }}
          >
            {'선택하신 리스트 내의 모든 데이터가 삭제됩니다.'}
            {/* 선택하신 품목 데이터가 삭제됩니다. */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button sx={{ p: 0, marginRight: '15px', color: '#737373', border: '1px solid #C0C0C0' }} onClick={onClose}>
              취소
            </Button>
            <Button variant="outlined" sx={{ p: 0 }} onClick={() => deleteMasterHandler(data)}>
              확인
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteMasterModal;
