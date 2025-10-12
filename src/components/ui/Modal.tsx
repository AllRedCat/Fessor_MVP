
import React from 'react';
import { Modal as MuiModal, ModalProps } from '@mui/material';

const Modal: React.FC<ModalProps> = (props) => {
  return <MuiModal {...props} />;
};

export default Modal;
