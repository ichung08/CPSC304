import React, { useState, useEffect, useCallback }  from 'react';
import AbilityTable from '../components/AbilityTable';

const Ability = () => {
    const [abilities, setAbilities] = useState([]);
    const [characterName, setCharacterName] = useState('');
    const [ultimateAttack, setUltimateAttack] = useState('');
    const [upAttack, setUpAttack] = useState('');
    const [neutralAttack, setNeutralAttack] = useState('');
    const [downAttack, setDownAttack] = useState('');
    const [refresh, setRefresh] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            character_name: characterName,
            ultimate_attack: ultimateAttack,
            up_attack: upAttack,
            neutral_attack: neutralAttack,
            down_attack: downAttack,
        };

        try {
            const response = await fetch('http://localhost:3001/api/ability', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log('Data:', data);
            setRefresh(true)
            console.log("Query:", data.query)
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                // console.log('Data:', data);
                // console.log('Query:', data.query)
                setAbilities(data.data);
                setRefresh(false)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchAbilities();
    }, [refresh]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="characterName">Character Name:</label>
                    <input
                    type="text"
                    id="characterName"
                    value={characterName}
                    onChange={(event) => setCharacterName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="ultimateAttack">Ultimate Attack:</label>
                    <input
                    type="text"
                    id="ultimateAttack"
                    value={ultimateAttack}
                    onChange={(event) => setUltimateAttack(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="upAttack">Up Attack:</label>
                    <input
                    type="text"
                    id="upAttack"
                    value={upAttack}
                    onChange={(event) => setUpAttack(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="neutralAttack">Neutral Attack:</label>
                    <input
                    type="text"
                    id="neutralAttack"
                    value={neutralAttack}
                    onChange={(event) => setNeutralAttack(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="downAttack">Down Attack:</label>
                    <input
                    type="text"
                    id="downAttack"
                    value={downAttack}
                    onChange={(event) => setDownAttack(event.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {abilities && <AbilityTable ability={abilities} />}
        </>
    );
}

export default Ability;
