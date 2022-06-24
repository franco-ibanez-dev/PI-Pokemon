import React from 'react';

export default function PokemonCard({ sprite, name, type }) {

    return (
        <div>
            <img src={sprite} />
            <h2>{name}</h2>
            <ul>{
                type.map((type) => {
                    return (
                        <li>{type}</li>
                    )
                })
            }</ul>

        </div>
    )
}