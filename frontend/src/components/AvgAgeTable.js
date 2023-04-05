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

const AvgAgeTable = ({ avgAge, attribute }) => {
  
  return (
    <Container>
        <Table>
          <thead>
            <Tr>
              <Th>{attribute}</Th>
              <Th>Average Age</Th>
            </Tr>
          </thead>
          <tbody>
            {avgAge.map(avgAge => (
              <Tr>
                {attribute == "country" ? 
                  <Td>{avgAge.country}</Td> : 
                  attribute == "wins" ? 
                  <Td>{avgAge.wins}</Td> : 
                  attribute == "losses" ?
                  <Td>{avgAge.losses}</Td> :
                  <Td>{avgAge.ranking_level}</Td>}
                <Td>{avgAge.avg_age}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
    </Container>
  );
};

export default AvgAgeTable;
