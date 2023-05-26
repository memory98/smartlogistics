import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs from 'dayjs';

const DateController = ({ onClickBefore, onClickAfter, dateArray, handleChangeDate  }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <Button 
          sx={{
            ':hover': {
              bgcolor: '#fff'
            }
          }}
          onClick={onClickBefore}><ChevronLeftIcon /></Button>
        <Box sx={{
          display: 'flex',
        }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={dayjs(dateArray[dateArray.length - 1])} onChange={handleChangeDate} />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button
          sx={{
            ':hover': {
              bgcolor: '#fff'
            }
          }}
          onClick={onClickAfter}><ChevronRightIcon /></Button>
      </Box>
    )
};

export default DateController;