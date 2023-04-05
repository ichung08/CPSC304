import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  background-color: #fff2bf;
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
    background-color: #e0d6af;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;


const CharacterTable = ({ Smash_Character }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Costume</Th>
        </Tr>
      </thead>
      <tbody>
        {Smash_Character.map(Smash_Character => (
          <Tr key={Smash_Character.character_name}>
            <Td>{Smash_Character.character_name}</Td>
            <Td>{Smash_Character.costume}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CharacterTable;
