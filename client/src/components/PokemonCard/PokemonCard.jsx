import React from 'react';

export default function PokemonCard({ sprite, name, types }) {

    let key = 1;
    
    return (
        <div>
            <img className="pokeSprite" src={sprite} alt="" height="200px" width="200px" />
            <h2>{name}</h2>
            <ul>{
                types.map((element) => {
                    key++;
                    return (
                        <li key={key}>{element.name}</li>
                    )
                })
            }
            </ul>

        </div>
    )
}