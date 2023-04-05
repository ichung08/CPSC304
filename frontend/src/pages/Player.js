import React, { useState, useEffect, useCallback }  from 'react';
import PlayerTable from '../components/PlayerTable';

const Player = () => {
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

    return (
        <>
            <PlayerTable players={players} />
        </>
    );
}

export default Player;