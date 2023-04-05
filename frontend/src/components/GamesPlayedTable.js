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
  margin-top: 2rem;
`;

const Th = styled.th`
  background-color: #ffadad;
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
    background-color: #d99393;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;

const GamesPlayedTable = ({ games_played }) => {
  return (
    <Container>
        <Table>
          <thead>
            <Tr>
              <Th>Username</Th>
              <Th>Number of Games Played</Th>
            </Tr>
          </thead>
          <tbody>
            {games_played.map(games_played => (
              <Tr key={games_played.username}>
                <Td>{games_played.username}</Td>
                <Td>{games_played.num_games_played}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
    </Container>
  );
};

export default GamesPlayedTable;
