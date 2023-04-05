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
