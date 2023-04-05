import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  background-color: #ffd68a;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.7rem;
  &:hover {
    text-shadow: 3px 3px #ccc;
  }
`;
const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #FDF9ED;
  }
  &:nth-child(odd) {
    background-color: #ffffff;
  }
  font-weight: 300;
  font-size: 0.9rem;
  &:hover {
    background-color: #deba78;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;
const EveryGameTable = ({ everyGame }) => {
  
  return (
        <Table>
          <thead>
            <Tr>
              <Th>Username</Th>
            </Tr>
          </thead>
          <tbody>
            {everyGame.map(everyGame => (
              <Tr>
                <Td>{everyGame.username}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
  );
};

export default EveryGameTable;
