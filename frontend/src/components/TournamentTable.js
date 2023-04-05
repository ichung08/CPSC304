import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 2rem;

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

const Button = styled.button`
  background-color: #f44336;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 4px #000000;
  }
`;


const TournamentTable = ({ tournament, handleDelete }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Tournament Name</Th>
          <Th>Organizer</Th>
          <Th>Start Date</Th>
          <Th>End Date</Th>
          <Th>Prize Pool</Th>
          <Th></Th>
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
            <Td>
              <Button onClick={() => handleDelete(tournament.tournament_id)}>Delete</Button>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TournamentTable;
