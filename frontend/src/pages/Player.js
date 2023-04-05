import React, { useState, useEffect, useCallback }  from 'react';
import PlayerTable from '../components/PlayerTable';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  margin-right: 5px;
  position: relative;
  top: 2px;
`;

const Player = () => {
    const [formData, setFormData] = useState({
        username: '',
        country: '',
        ranking_level: '',
        age: '',
        wins: '',
        losses: '',
    });
    const [attributes, setAttributes] = useState([]);
    const [players, setPlayers] = useState([]);

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
    }, []);

    // Selection
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitSelect = async (event) => {
        event.preventDefault();
    
        const queryParams = new URLSearchParams(formData).toString();
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

    return (
        <>
          <h1 style={{ textAlign: 'center', fontSize: '1em', margin: '1em 0' }}>Player Selection</h1>
          <form onSubmit={handleSubmitSelect} style={{ textAlign: 'center', fontSize: '1em', margin: '1em 0' }}>
            <label>
              Username:
              <input type="text" name="username" value={formData.username} onChange={handleChange} style={{ margin: '1em', width: '10em', height: '2em' }} />
            </label>
            <label style={{ marginLeft: '1em' }}>
              Country:
              <input type="text" name="country" value={formData.country} onChange={handleChange} style={{ margin: '1em', width: '10em', height: '2em' }} />
            </label>
            <label style={{ marginLeft: '1em' }}>
              Ranking Level:
              <input type="text" name="ranking_level" value={formData.ranking_level} onChange={handleChange} style={{ margin: '1em', width: '10em', height: '2em' }} />
            </label>
            <br />
            <label style={{ marginLeft: '1em' }}>
              Age:
              <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ margin: '1em', width: '10em', height: '2em' }} />
            </label>
            <label style={{ marginLeft: '1em' }}>
              Wins:
              <input type="number" name="wins" value={formData.wins} onChange={handleChange} style={{ margin: '1em', width: '10em', height: '2em' }} />
            </label>
            <label style={{ marginLeft: '1em' }}>
              Losses:
              <input type="number" name="losses" value={formData.losses} onChange={handleChange} style={{ margin: '1em', width: '10em', height: '2em' }} />
            </label>
            <button type="submit" style={{ fontSize: '1em', margin: '1em' }}>Search</button>
          </form>
          <form onSubmit={handleSubmitProject} style={{ textAlign: 'center', fontSize: '1em' }}>
            <label style={{ margin: '1em' }}>
              <StyledCheckbox type="checkbox" value="username" checked={attributes.includes('username')} onChange={handleCheckboxChange} />
              Username
            </label>
            <label style={{ margin: '1em' }}>
              <StyledCheckbox type="checkbox" value="country" checked={attributes.includes('country')} onChange={handleCheckboxChange} />
              Country
            </label>
            <label style={{ margin: '1em' }}>
              <StyledCheckbox type="checkbox" value="ranking_level" checked={attributes.includes('ranking_level')} onChange={handleCheckboxChange} />
              Ranking Level
            </label>
            <label style={{ margin: '1em' }}>
              <StyledCheckbox type="checkbox" value="age" checked={attributes.includes('age')} onChange={handleCheckboxChange} />
              Age
            </label>
            <label style={{ margin: '1em' }}>
              <StyledCheckbox type="checkbox" value="wins" checked={attributes.includes('wins')} onChange={handleCheckboxChange} />
              Wins
            </label>
            <label style={{ margin: '1em' }}>
              <StyledCheckbox type="checkbox" value="losses" checked={attributes.includes('losses')} onChange={handleCheckboxChange} />
              Losses
            </label>
            <button type="submit" style={{ fontSize: '1em', margin: '1em' }}>Submit</button>
          </form>
          <PlayerTable players={players} style={{ margin: '1em 0' }} />
        </>
      );
      
      
}

export default Player;