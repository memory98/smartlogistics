import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Modal2 from "../Modal/Modal2";
import Modal3 from "../Modal/Modal3";
import Modal4 from "../Modal/Modal4";

const ProductModal = () => {
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const toggleModal = (open, _setOpen) =>
    open ? _setOpen(false) : _setOpen(true);
  return (
    <Box>
      <Box>
        <Button onClick={() => toggleModal(open2, setOpen2)}>
          OPEN MODAL2
        </Button>
        <Modal2 open={open2} onClose={() => setOpen2(false)} />
        <Button onClick={() => toggleModal(open3, setOpen3)}>
          OPEN MODAL3
        </Button>
        <Modal3 open={open3} onClose={() => setOpen3(false)} />
        <Button onClick={() => toggleModal(open4, setOpen4)}>
          OPEN MODAL4
        </Button>
        <Modal4 open={open4} onClose={() => setOpen4(false)} />
      </Box>
    </Box>
  );
};

export default ProductModal;
