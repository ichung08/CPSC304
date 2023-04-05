import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 2rem;
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

const GameTournamentTable = ({ game_tournament }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Game ID</Th>
          <Th>Tournament ID</Th>
        </Tr>
      </thead>
      <tbody>
        {game_tournament.map((game_tournament, index) => (
          <Tr key={index}>
            <Td>{game_tournament.game_id}</Td>
            <Td>{game_tournament.tournament_id}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GameTournamentTable;
