import React, { useState, useEffect, useCallback }  from 'react';
import PlayerTable from '../components/PlayerTable';

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
    const handleChangeSelect = (event) => {
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

    // Update
    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }
    
    const handleSubmitEdit = async (event) => {
        try {
            const response = await fetch(`http://localhost:3001/api/player/${formData.username}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPlayers(data.data);
            console.log("Query:", data.query)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChangeSelect} />
                </label>
                <br />
                <label>
                    Country:
                    <input type="text" name="country" value={formData.country} onChange={handleChangeSelect} />
                </label>
                <br />
                <label>
                    Ranking Level:
                    <input type="text" name="ranking_level" value={formData.ranking_level} onChange={handleChangeSelect} />
                </label>
                <br />
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChangeSelect} />
                </label>
                <br />
                <label>
                    Wins:
                    <input type="number" name="wins" value={formData.wins} onChange={handleChangeSelect} />
                </label>
                <br />
                <label>
                    Losses:
                    <input type="number" name="losses" value={formData.losses} onChange={handleChangeSelect} />
                </label>
                <br />
                <button type="submit" onClick={handleSubmitSelect}>Search</button>
                <button type="submit" onClick={handleSubmitEdit}>Update</button>
            </form>
            <form onSubmit={handleSubmitProject}>
                <label>
                    <input type="checkbox" value="username" checked={attributes.includes('username')} onChange={handleCheckboxChange} />
                    Username
                </label>
                <label>
                    <input type="checkbox" value="country" checked={attributes.includes('country')} onChange={handleCheckboxChange} />
                    Country
                </label>
                <label>
                    <input type="checkbox" value="ranking_level" checked={attributes.includes('ranking_level')} onChange={handleCheckboxChange} />
                    Ranking Level
                </label>
                <label>
                    <input type="checkbox" value="age" checked={attributes.includes('age')} onChange={handleCheckboxChange} />
                    Age
                </label>
                <label>
                    <input type="checkbox" value="wins" checked={attributes.includes('wins')} onChange={handleCheckboxChange} />
                    Wins
                </label>
                <label>
                    <input type="checkbox" value="losses" checked={attributes.includes('losses')} onChange={handleCheckboxChange} />
                    Losses
                </label>
                <button type="submit">Submit</button>
            </form>
            <PlayerTable players={players} />
        </>
    );
}

export default Player;