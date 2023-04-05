
import React, { useState, useEffect } from 'react';
import TournamentTable from '../components/TournamentTable';
import Toast from '../components/Toast';

const Tournament = () => {
    const [tournament, setTournament] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");
    const [toastMessage, setToastMessage] = useState("");

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
        setShowToast(true);
        setToastType("success");
        setToastMessage("Delete successful!");
        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {
        console.error('Error:', error);
        setShowToast(true);
        setToastType("failure");
        setToastMessage("Delete failed!");
        setTimeout(() => setShowToast(false), 3000);
      }
    };
    
    const handleCloseToast = () => {
      setShowToast(false);
    };

  return (
    <>
      {showToast && (
        <Toast type={toastType} message={toastMessage} onClose={handleCloseToast} />
      )}
      <TournamentTable tournament={tournament} handleDelete={handleDelete} />
    </>

  );
};

export default Tournament;