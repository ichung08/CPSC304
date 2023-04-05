import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


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
const WinsTable = ({ wins, attribute }) => {
  
  return (
        <Table>
          <thead>
            <Tr>
              <Th>{attribute}</Th>
              <Th>Total Wins</Th>
            </Tr>
          </thead>
          <tbody>
            {wins.map(wins => (
              <Tr>
                {attribute == "country" ? 
                  <Td>{wins.country}</Td> : 
                  attribute == "age" ? 
                  <Td>{wins.age}</Td> : <Td>{wins.ranking_level}</Td>}
                <Td>{wins.total_wins}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
  );
};

export default WinsTable;
