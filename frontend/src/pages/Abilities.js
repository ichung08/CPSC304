import React, { useState, useEffect, useCallback }  from 'react';
import AbilityTable from '../components/AbilityTable';

const Ability = () => {
    const [abilities, setAbilities] = useState([]);

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
                console.log('Data:', data);
                setAbilities(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchAbilities();
    }, []);

    return (
        <>
            <AbilityTable ability={abilities} />
        </>
    );
}

export default Ability;
