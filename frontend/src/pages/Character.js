import React, { useState, useEffect } from 'react';
import CharacterTable from '../components/CharacterTable';

const SmashCharacter = () => {
    const [Smash_Character, setSmash_Character] = useState([]);
  
    useEffect(() => {
      const fetchSmash_Character = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/smash_character', {
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
          setSmash_Character(data.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchSmash_Character();
    }, []);

  return (
    <>
      <CharacterTable Smash_Character={Smash_Character} />
    </>
  );
};

export default SmashCharacter;



