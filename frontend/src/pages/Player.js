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
                console.log('Data:', data);
                console.log('Query:', data.query)
                setPlayers(data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const queryParams = new URLSearchParams(formData).toString();
        const response = await fetch(`http://localhost:3001/api/player-selection?${queryParams}`);
        const data = await response.json();
    
        setPlayers(data.data);
    };

    return (
        <>
            <h1>Player Selection</h1>
            <form onSubmit={handleSubmit}>
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
            <PlayerTable players={players} />
        </>
    );
}

export default Player;