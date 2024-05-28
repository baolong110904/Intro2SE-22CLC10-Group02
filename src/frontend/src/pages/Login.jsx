import React, { useState } from 'react';
import Modal from '../components/Modal';

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div id="login">
      <Modal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default Login;
