import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
`;

const Th = styled.th`
  background-color: #C8E3E5;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #FDF9ED;
  }
  font-weight: 300;
  font-size: 0.9rem;
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const WinsTable = ({ wins, attribute }) => {
  
  return (
    <Container>
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
    </Container>
  );
};

export default WinsTable;
