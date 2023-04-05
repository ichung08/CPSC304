import React, { useState, useEffect, useCallback }  from 'react';
import PlayerTable from '../components/PlayerTable';
import styled from 'styled-components';
import Toast from '../components/Toast';


const StyledH1 = styled.h1`
  text-align: center;
  font-size: 1em;
  margin: 0.5em 0;
  font-weight: bold;
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
`;


const StyledInput = styled.input`
  margin: 1em;
  width: 10em;
  height: 2em;
`;

const StyledButton = styled.button`
  font-size: 1em;
  margin: 0.5em;
  background-color: #FFD6E8;
  padding: 0.3rem;
  &:hover {
    box-shadow: 5px 5px 5px #000000;
  }
  &:active {
    background-color: #dea6d5;
  }
`;


const StyledCheckbox = styled.input`
  margin-right: 15px;
  position: relative;
  top: 2px;
  transform: scale(2);
`;


const Player = () => {
    const [attributes, setAttributes] = useState([]);
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [rankingLevel, setRankingLevel] = useState("");
    const [age, setAge] = useState("");
    const [wins, setWins] = useState("");
    const [losses, setLosses] = useState("");
    const [refresh, setRefresh] = useState(false)

    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/players', {
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
                setPlayers(data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchData();
    }, [refresh]);

    // Selection

    const handleSubmitSelect = async (event) => {
        event.preventDefault();

        const requestBody = {
          username: username,
          country: country,
          ranking_level: rankingLevel,
          age: age,
          wins: wins,
          losses: losses
        }
    
        const queryParams = new URLSearchParams(requestBody).toString();
        const response = await fetch(`http://localhost:3001/api/player-selection?${queryParams}`);
        const data = await response.json();
    
        setPlayers(data.data);
        console.log("Query:", data.query)
    };

    // Projection
    const handleCheckboxChange = (event) => {
        const attribute = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setAttributes([...attributes, attribute]);
        } else {
            setAttributes(attributes.filter(attr => attr !== attribute));
        }
    };

    const handleSubmitProject = async (event) => {
        event.preventDefault();
        const query = `http://localhost:3001/api/player-projection?attributes=${attributes.join('&attributes=')}`;
        try {
            const response = await fetch(query);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPlayers(data.data);
            console.log("Query:", data.query)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Update
    const handleSubmitEdit = async (event) => {
      event.preventDefault();

      const requestBody = {
        username: username,
        country: country,
        ranking_level: rankingLevel,
        age: age,
        wins: wins,
        losses: losses
      }
        try {
            const response = await fetch(`http://localhost:3001/api/player/${username}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRefresh(true)
            console.log("Query:", data.query)
            setShowToast(true);
            setToastType("success");
            setToastMessage("Update successful!");
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Error:', error);
            setShowToast(true);
            setToastType("failure");
            setToastMessage("Update failed!");
            setTimeout(() => setShowToast(false), 3000);
        }
    }

    const handleCloseToast = () => {
      setShowToast(false);
    };


    return (
      <>
        <StyledH1>Player Selection</StyledH1>
        {showToast && (
          <Toast type={toastType} message={toastMessage} onClose={handleCloseToast} />
        )}
        <StyledForm>
          <StyledLabel>
            Username:
            <StyledInput type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
          </StyledLabel>
          <StyledLabel>
            Country:
            <StyledInput type="text" name="country" value={country} onChange={(event) => setCountry(event.target.value)} />
          </StyledLabel>
          <StyledLabel>
            Ranking Level:
            <StyledInput type="text" name="ranking_level" value={rankingLevel} onChange={(event) => setRankingLevel(event.target.value)} />
          </StyledLabel>
          <br />
          <StyledLabel>
            Age:
            <StyledInput type="number" name="age" value={age} onChange={(event) => setAge(event.target.value)} />
          </StyledLabel>
          <StyledLabel>
            Wins:
            <StyledInput type="number" name="wins" value={wins} onChange={(event) => setWins(event.target.value)} />
          </StyledLabel>
          <StyledLabel>
            Losses:
            <StyledInput type="number" name="losses" value={losses} onChange={(event) => setLosses(event.target.value)} />
          </StyledLabel>
          <StyledButton type="submit" onClick={handleSubmitSelect}>Search</StyledButton>
          <StyledButton type="submit" onClick={handleSubmitEdit}>Update</StyledButton>
        </StyledForm>
        <StyledForm onSubmit={handleSubmitProject}>
          <StyledLabel>
            <StyledCheckbox type="checkbox" value="username" checked={attributes.includes('username')} onChange={handleCheckboxChange} />
            Username
          </StyledLabel>
          <StyledLabel>
            <StyledCheckbox type="checkbox" value="country" checked={attributes.includes('country')} onChange={handleCheckboxChange} />
            Country
          </StyledLabel>
          <StyledLabel>
            <StyledCheckbox type="checkbox" value="ranking_level" checked={attributes.includes('ranking_level')} onChange={handleCheckboxChange} />
            Ranking Level
          </StyledLabel>
          <StyledLabel>
            <StyledCheckbox type="checkbox" value="age" checked={attributes.includes('age')} onChange={handleCheckboxChange} />
            Age
          </StyledLabel>
          <StyledLabel>
            <StyledCheckbox type="checkbox" value="wins" checked={attributes.includes('wins')} onChange={handleCheckboxChange} />
            Wins
          </StyledLabel>
          <StyledLabel>
            <StyledCheckbox type="checkbox" value="losses" checked={attributes.includes('losses')} onChange={handleCheckboxChange} />
            Losses
          </StyledLabel>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
        {players && <PlayerTable players={players} style={{ margin: '1em 0' }} />}
      </>
    );
      
      
}

export default Player;