import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const Toast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ type }) => (type === 'success' ? '#4CAF50' : '#F44336')};
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
`;

const PopUpToast = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ToastContainer>
      <Toast show={show} type={type}>
        {message}
        <CloseButton onClick={() => setShow(false)}>x</CloseButton>
      </Toast>
    </ToastContainer>
  );
};

export default PopUpToast;
