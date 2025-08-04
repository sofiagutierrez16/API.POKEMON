// src/components/PokemonCard.js
import React from 'react';

function PokemonCard({ name, image, characteristics }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      width: '150px',
      textAlign: 'center',
      margin: '10px'
    }}>
      <img src={image} alt={name} style={{ width: '120px', height: '120px' }} />
      <h3>{name}</h3>
      {characteristics.map((char, index) => (
        <p key={index}>{char}</p>
      ))}
    </div>
  );
}

export default PokemonCard;


