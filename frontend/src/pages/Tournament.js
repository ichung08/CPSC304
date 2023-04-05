
import React, { useState, useEffect } from 'react';
import TournamentTable from '../components/TournamentTable';

const Tournament = () => {
    const [tournament, setTournament] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/tournament');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Data:', data);
          setTournament(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, []);
    

  return (
    // render your component with the retrieved data
    <TournamentTable tournament={tournament} />
  );
};

export default Tournament;