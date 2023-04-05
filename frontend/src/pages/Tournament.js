
import React, { useState, useEffect } from 'react';
import TournamentTable from '../components/TournamentTable';

const Tournament = () => {
    const [tournament, setTournament] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/tournament');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // console.log('Data:', data);
          // console.log('Query:', data.query)
          setTournament(data.data);
          setRefresh(false)
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, [refresh]);

    const handleDelete = async (tournamentId) => {
      try {
        const response = await fetch(`http://localhost:3001/api/tournament/${tournamentId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json()
        console.log(data.query)
        setRefresh(true)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  return (
    // render your component with the retrieved data
    <TournamentTable tournament={tournament} handleDelete={handleDelete} />
  );
};

export default Tournament;