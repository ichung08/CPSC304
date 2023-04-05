import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  background-color: #C4A484;
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
    background-color: #c7b6a5;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;


const TournamentTable = ({ tournament }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Tournament Name</Th>
          <Th>Organizer</Th>
          <Th>Start Date</Th>
          <Th>End Date</Th>
          <Th>Prize Pool</Th>
        </Tr>
      </thead>
      <tbody>
        {tournament.map((tournament, index) => (
          <Tr key={index}>
            <Td>{tournament.tournament_name}</Td>
            <Td>{tournament.organizer}</Td>
            <Td>{tournament.startdate.substring(0, 10)}</Td>
            <Td>{tournament.enddate.substring(0, 10)}</Td>
            <Td>{tournament.prize_pool}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TournamentTable;
