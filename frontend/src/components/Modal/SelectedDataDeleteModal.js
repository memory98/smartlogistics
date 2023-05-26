import React from 'react';
import { Box, Modal, Button } from '@mui/material';

import error from '../../assets/img/error.png';
export default function SelectedDataDeleteModal({ open, handleClose, modalMessage, checkedButtons, onDeleteButton }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: checkedButtons.length === 0 ? 230 : 300,
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
            whiteSpace: 'pre-wrap',
          }}
        >
          {modalMessage()}
        </Box>

        {checkedButtons.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="outlined" sx={{ p: 0 }} onClick={handleClose}>
              확인
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button sx={{ p: 0, marginRight: '15px', color: '#737373', border: '1px solid #C0C0C0' }} onClick={handleClose}>
              취소
            </Button>
            <Button variant="outlined" sx={{ p: 0 }} onClick={onDeleteButton}>
              확인
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
