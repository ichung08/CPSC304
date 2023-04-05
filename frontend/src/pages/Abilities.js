import React, { useState, useEffect, useCallback }  from 'react';
import AbilityTable from '../components/AbilityTable';
import styled, { keyframes } from 'styled-components';

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 1em;
  margin: 0.5em 0;
  font-weight: bold;
`;

const StyledButton = styled.button`
  font-size: 1em;
  margin: 0.5em;
  background-color: #bef0bd;
  padding: 0.3rem;
  
  &:hover {
    box-shadow: 5px 5px 5px #000000;
  }

  &:active {
    background-color: #89c997;
  }
`;


const StyledForm = styled.form`
  text-align: center;
  font-size: 1.3em;
  margin: 0.5em 0;
  font-weight: bold;
`;


const StyledLabel = styled.label`
  margin-left: 1em;
  font-weight: bold;
  flex: 0 0 150px; /* Fixed width value */
`;


const StyledInput = styled.input`
  margin: 1em;
  width: 10em;
  height: 2em;
`;

const StyledCheckbox = styled.input`
  margin-right: 15px;
  position: relative;
  top: 2px;
  transform: scale(2);
`;

const Ability = () => {
    const [abilities, setAbilities] = useState([]);
    const [characterName, setCharacterName] = useState('');
    const [ultimateAttack, setUltimateAttack] = useState('');
    const [upAttack, setUpAttack] = useState('');
    const [neutralAttack, setNeutralAttack] = useState('');
    const [downAttack, setDownAttack] = useState('');
    const [refresh, setRefresh] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            character_name: characterName,
            ultimate_attack: ultimateAttack,
            up_attack: upAttack,
            neutral_attack: neutralAttack,
            down_attack: downAttack,
        };

        try {
            const response = await fetch('http://localhost:3001/api/ability', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log('Data:', data);
            setRefresh(true)
            console.log("Query:", data.query)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchAbilities = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/ability', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // console.log('Data:', data);
                // console.log('Query:', data.query)
                setAbilities(data.data);
                setRefresh(false)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchAbilities();
    }, [refresh]);


function Ability() {
    const [showTable, setShowTable] = useState(false);
  
    const toggleTable = () => {
      setShowTable(!showTable);
    }
  
    return (
      <>
        <StyledForm onSubmit={handleSubmit}>
          {/* your form inputs */}
        </StyledForm>
  
        <div>
          <button onClick={toggleTable}>
            {showTable ? 'Hide Table' : 'Show Table'}
          </button>
  
          {showTable && abilities && <AbilityTable ability={abilities} />}
        </div>
      </>
    );
  }  
  

    return (
        <>
          <StyledForm onSubmit={handleSubmit}>
              <StyledLabel htmlFor="characterName">Character Name:</StyledLabel>
              <StyledInput
                type="text"
                id="characterName"
                value={characterName}
                onChange={(event) => setCharacterName(event.target.value)}
              />


              <StyledLabel htmlFor="ultimateAttack">Ultimate Attack:</StyledLabel>
              <StyledInput
                type="text"
                id="ultimateAttack"
                value={ultimateAttack}
                onChange={(event) => setUltimateAttack(event.target.value)}
              />

              <StyledLabel htmlFor="upAttack">Up Attack:</StyledLabel>
              <StyledInput
                type="text"
                id="upAttack"
                value={upAttack}
                onChange={(event) => setUpAttack(event.target.value)}
              />
            <br />
              <StyledLabel htmlFor="neutralAttack">Neutral Attack:</StyledLabel>
              <StyledInput
                type="text"
                id="neutralAttack"
                value={neutralAttack}
                onChange={(event) => setNeutralAttack(event.target.value)}
              />

              <StyledLabel htmlFor="downAttack">Down Attack:</StyledLabel>
              <StyledInput
                type="text"
                id="downAttack"
                value={downAttack}
                onChange={(event) => setDownAttack(event.target.value)}
              />
            <StyledButton type="submit">Submit</StyledButton>
          </StyledForm>
          {abilities && <AbilityTable ability={abilities} />}
        </>
      );
      
}

export default Ability;
