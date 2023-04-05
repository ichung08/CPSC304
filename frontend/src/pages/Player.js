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
            <h1>Player Selection</h1>
            <form onSubmit={handleSubmitSelect}>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Country:
                    <input type="text" name="country" value={formData.country} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Ranking Level:
                    <input type="text" name="ranking_level" value={formData.ranking_level} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Wins:
                    <input type="number" name="wins" value={formData.wins} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Losses:
                    <input type="number" name="losses" value={formData.losses} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Search</button>
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