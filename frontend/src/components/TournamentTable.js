import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #f8f8f8;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const TournamentTable = ({ tournament }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Tournament Name</Th>
          <Th>Organizer</Th>
          <Th>Start Date</Th>
          <Th>End Date</Th>
          <Th>Prize Pool</Th>
        </tr>
      </thead>
      <tbody>
        {tournament.map(tournament => (
          <tr key={tournament.tournament_id}>
            <Td>{tournament.tournament_name}</Td>
            <Td>{tournament.organizer}</Td>
            <Td>{tournament.startdate}</Td>
            <Td>{tournament.enddate}</Td>
            <Td>{tournament.prize_pool}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TournamentTable;
