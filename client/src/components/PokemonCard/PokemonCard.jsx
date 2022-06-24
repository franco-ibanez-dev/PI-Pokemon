import React from 'react';

export default function PokemonCard({ sprite, name, types }) {

    return (
        <div>
            <img src={sprite} />
            <h2>{name}</h2>
            
        </div>
    )
}