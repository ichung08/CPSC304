import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const Th = styled.th`
  background-color: #FFD6E8;
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
    background-color: #F9C2D1;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;

const PlayerTable = ({ players }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Username</Th>
          <Th>Country</Th>
          <Th>Ranking Level</Th>
          <Th>Age</Th>
          <Th>Wins</Th>
          <Th>Losses</Th>
        </Tr>
      </thead>
      <tbody>
        {players.map(player => (
          <Tr key={player.username}>
            <Td>{player.username}</Td>
            <Td>{player.country}</Td>
            <Td>{player.ranking_level}</Td>
            <Td>{player.age}</Td>
            <Td>{player.wins}</Td>
            <Td>{player.losses}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PlayerTable;
