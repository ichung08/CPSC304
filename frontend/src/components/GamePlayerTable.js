import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  background-color: #fffcb5;
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
    background-color: #dedca4;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;

const GamePlayerTable = ({ game_player }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Game ID</Th>
          <Th>Username</Th>
          <Th>Character Name</Th>
        </Tr>
      </thead>
      <tbody>
        {game_player.map((game_player, index) => (
          <Tr key={index}>
            <Td>{game_player.game_id}</Td>
            <Td>{game_player.username}</Td>
            <Td>{game_player.character_name}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GamePlayerTable;
